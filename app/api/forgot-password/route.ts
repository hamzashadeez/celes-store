import connectDB from "@/connectDB";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Do not reveal whether email exists in production - but for now we return 404
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // generate a new 6-digit code and store it on the user
    const code = String(Math.floor(100000 + Math.random() * 900000));

    user.code = code;
    await user.save();

    // send reset email
    await sendPasswordResetEmail(email, code);

    return NextResponse.json({ message: "Password reset code sent to email" });
  } catch (error: any) {
    console.error("forgot-password error", error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
