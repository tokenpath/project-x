import { z } from "zod";
import { SignUpSchema } from "@/lib/zod/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleUnexpectedError } from "@/lib/handleUnexpectedError";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/crypto";

const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = SignUpSchema.parse(body);

    const { username, email, password } = validatedData;

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userAlreadyExists)
      return NextResponse.json(
        {
          message: "Email or Username already in use",
        },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    try {
      const session = await prisma.session.create({
        data: {
          expiresAt: expiresAt,
          sessionToken: uuidv4(),
          userId: user.id,
        },
      });

      const encryptedSession = await encrypt(session);
      if (!encryptedSession) {
        throw new Error("Failed to encrypt session token");
      }

      const cookieStore = await cookies();
      cookieStore.set({
        name: "auth",
        value: encryptedSession,
        httpOnly: true,
        secure: true, 
        sameSite: "strict", 
        path: "/",
        expires: expiresAt,
      });
    } catch (e) {
      if (e)
        return NextResponse.json(
          {
            success: false,
            message: "Failed to create session",
          },
          { status: 500 }
        );
    }

    return NextResponse.json(
      {
        message: "Signup successful",
        data: validatedData,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Failed",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    return handleUnexpectedError(error);
  }
}
