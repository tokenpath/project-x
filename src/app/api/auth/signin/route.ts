import { z } from "zod";
import { SignInSchema } from "@/lib/zod/auth";
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

    const validatedData = SignInSchema.parse(body);

    const { email, password } = validatedData;

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    if (!user.password || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

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

      return NextResponse.json(
        {
          message: "Signin successful",
          data: { username: user.username, email: user.email },
        },
        { status: 200 }
      );
    } catch (e) {
      if (e instanceof Error) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to create session",
          },
          { status: 500 }
        );
      }
      return handleUnexpectedError(e);
    }
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
