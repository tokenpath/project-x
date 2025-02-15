import { Session, User } from "@prisma/client";
import { decrypt } from "../crypto";
import { NextResponse } from "next/server";
import prisma from "../prisma";

namespace UserHelper {
  export async function GetCurrent(token: string): Promise<User | NextResponse> {
    try {
      const sessionData = await decrypt<Session>(token);

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

      if (!session || session.expiresAt < new Date()) {
        return NextResponse.json(
          { isAuthenticated: false, message: "Session expired" },
          { status: 401 }
        );
      }

      if (!session.user) {
        return NextResponse.json(
          { isAuthenticated: false, message: "User not found in session" },
          { status: 404 }
        );
      }

      return session.user;

    } catch (error) {
      console.error("Error in GetCurrent:", error);
      return NextResponse.json(
        { isAuthenticated: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}

export default UserHelper;
