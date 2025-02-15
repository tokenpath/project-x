import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import UserHelper from "@/lib/user/user";

export async function GET() {
  try {
    const authCookie = (await cookies()).get("auth");

    if (!authCookie) {
      return NextResponse.json(
        { isAuthenticated: false, message: "No session found" },
        { status: 401 }
      );
    }

    const userOrResponse = await UserHelper.GetCurrent(authCookie.value);

    if (userOrResponse instanceof NextResponse) {
      return userOrResponse; 
    } else {
      return NextResponse.json(userOrResponse);
    }

  } catch (error) {
    console.error("Failed due to: ", error);
    return NextResponse.json(
      { isAuthenticated: false, message: "Server error" },
      { status: 500 }
    );
  }
}
