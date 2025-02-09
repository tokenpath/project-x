import { decrypt } from "@/lib/crypto";
import prisma from "@/lib/prisma";
import { SettingsData, SettingsSchema } from "@/lib/zod/auth";
import { Session } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const authCookie = (await cookies()).get("auth");

    if (!authCookie) {
      return NextResponse.json(
        { isAuthenticated: false, message: "No session found" },
        { status: 401 }
      );
    }

    const sessionData = await decrypt<Session>(authCookie.value);

    if (!sessionData || !sessionData.sessionToken) {
      return NextResponse.json(
        { isAuthenticated: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken: sessionData.sessionToken },
      include: { user: true },
    });

    if (!session || new Date(session.expiresAt) < new Date()) {
      return NextResponse.json(
        { isAuthenticated: false, message: "Session expired" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.userId,
      },
    });

    if (user) {
      const body = await req.json();

      const validatedData: SettingsData = SettingsSchema.parse(body);

      switch (validatedData.operation) {
        case "changeEmail":
          if (!validatedData.oldPassword) {
            return NextResponse.json(
              { message: "Old password is required" },
              { status: 400 }
            );
          }

          if (!(await bcrypt.compare(validatedData.oldPassword, user.password!))) {
            return NextResponse.json(
              { message: "Old password is incorrect" },
              { status: 401 }
            );
          }

          if (!validatedData.newEmail) {
            return NextResponse.json(
              { message: "New email address is required" },
              { status: 400 }
            );
          }

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              email: validatedData.newEmail,
            },
          });

          return NextResponse.json(
            { message: "Email address changed successfully" },
            { status: 200 }
          );

        case "changePassword":
          if (!validatedData.oldPassword || !validatedData.newPassword) {
            return NextResponse.json(
              { message: "Old and new passwords are required" },
              { status: 400 }
            );
          }

          if (!(await bcrypt.compare(validatedData.oldPassword, user.password!))) {
            return NextResponse.json(
              { message: "Old password is incorrect" },
              { status: 401 }
            );
          }

          const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              password: hashedPassword,
            },
          });

          return NextResponse.json(
            { message: "Password changed successfully" },
            { status: 200 }
          );

        default:
          return NextResponse.json(
            { message: "Unexpected operation" },
            { status: 400 }
          );
      }
    } else {
      return NextResponse.json(
        { isAuthenticated: false, message: "User not found" },
        { status: 404 }
      );
    }
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { message: e.message },
      { status: 500 }
    );
  }
}
