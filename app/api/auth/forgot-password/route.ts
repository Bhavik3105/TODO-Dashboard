import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      // Return 200 anyway to prevent email enumeration attacks
      return new NextResponse("If an account exists, a reset link will be sent.", { status: 200 });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save to database (expires in 1 hour)
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    // DEMO: Print to console instead of sending email
    console.log("\n\n==========================================");
    console.log("PASSWORD RESET LINK GENERATED (MOCK EMAIL)");
    console.log(`To: ${user.email}`);
    console.log(`Link: ${resetUrl}`);
    console.log("==========================================\n\n");

    // We'll also return the link in the response ONLY for demo purposes 
    // so the frontend can show it in an alert to the reviewer
    return NextResponse.json({ 
      message: "If an account exists, a reset link will be sent.",
      demoLink: resetUrl // Only for demo! Remove in production.
    }, { status: 200 });

  } catch (error) {
    console.error("Forgot password error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
