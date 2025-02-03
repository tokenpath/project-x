import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/crypto";
import { Session } from "@prisma/client";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth");

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

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed due to: ", error);
    return NextResponse.json(
      { isAuthenticated: false, message: "Server error" },
      { status: 500 }
    );
  }
}
