import connectDB from "@/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Wallet from "@/models/walletModel";
import { verifyJwt } from "@/helpers/jwt";

async function getUserIdFromRequest(request: NextRequest) {
  const cookie = request.headers.get("cookie") || "";
  const tokenMatch = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("token="));
  if (!tokenMatch) return null;
  const token = tokenMatch.split("=")[1];
  const payload: any = await verifyJwt(token);
  return payload?.id || null;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
     const body = await request.json();

    const { pin } = body;
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existing = await Wallet.findOne({ userId });
    if (existing) return NextResponse.json({ message: "Wallet already exists", wallet: existing });

    const wallet = await Wallet.create({ userId, balance: 0, ledgerBalance: 0, currency: "NGN", isLocked: false, pin });

    return NextResponse.json({ message: "Wallet created", wallet });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
