import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/crypto";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth");

    if (!authCookie) {
      return NextResponse.json(
        {
          message: "No active session found",
        },
        { status: 401 }
      );
    }

    const decryptedSessionToken = await decrypt(authCookie.value);
    if (!decryptedSessionToken) {
      throw new Error("Failed to decrypt session token");
    }

    await prisma.session.delete({
      where: { sessionToken: decryptedSessionToken },
    });

    cookieStore.delete("auth");

    return NextResponse.json(
      {
        message: "Signout successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during signout:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to sign out",
      },
      { status: 500 }
    );
  }
}
