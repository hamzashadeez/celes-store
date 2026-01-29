import connectDB from "@/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/models/transactionModel";
import Wallet from "@/models/walletModel";
import crypto from "crypto";
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const raw = await request.text();
    const payload = JSON.parse(raw);

    const signature = request.headers.get("x-paystack-signature") || "";
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_TEST_SECRET_KEY || "";

    // 1. SECURITY: Strict Signature Check
    const hmac = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(raw).digest("hex");
    if (hmac !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = payload?.event;
    const data = payload?.data;
    const reference = data?.reference;

    // 2. IDEMPOTENCY: Stop double-crediting
    // Check if transaction is already marked as success
    const tx = await Transaction.findOne({ txRef: reference });
    if (!tx) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    
    if (tx.status === "success") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    // 3. LOGIC: Handle only the 'charge.success' event
    if (event === "charge.success") {
      tx.status = "success";
      tx.providerResponse = payload;
      await tx.save();

      const amount = Number(data?.amount || 0) / 100;

      // Use findOneAndUpdate for atomic balance updates (prevents race conditions)
      const updatedWallet = await Wallet.findOneAndUpdate(
        { userId: tx.userId },
        { 
          $inc: { 
            balance: amount, 
            ledgerBalance: amount 
          } 
        },
        { new: true }
      );

      if (!updatedWallet) {
        console.warn("Wallet not found for user", tx.userId);
        return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
      }

      return NextResponse.json({ status: "success" });
    }

    // Handle failed events specifically if needed
    if (event === "charge.failed") {
        tx.status = "failed";
        await tx.save();
    }

    return NextResponse.json({ status: "event ignored" });

  } catch (err: any) {
    console.error("Paystack webhook error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  // If Paystack appends the reference to the URL, you can grab it
  // though for a simple redirect, we just send them to the dashboard.
  redirect('/dashboard');
}

// import connectDB from "@/connectDB";
// import { NextRequest, NextResponse } from "next/server";
// import Transaction from "@/models/transactionModel";
// import Wallet from "@/models/walletModel";
// import crypto from "crypto";

// // Paystack webhook handler
// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();

//     const raw = await request.text();
//     let payload: any = {};
//     try {
//       payload = JSON.parse(raw);
//     } catch (e) {
//       // ignore
//     }

//     const signature = request.headers.get("x-paystack-signature") || "";
//     const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_TEST_SECRET_KEY || "";

//     if (PAYSTACK_SECRET_KEY && signature) {
//       const hmac = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(raw).digest("hex");
//       if (hmac !== signature) {
//         console.warn("Paystack webhook signature mismatch", { expected: hmac, got: signature });
//         return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
//       }
//     }

//     // Paystack sends event and data
//     const event = payload?.event || "";
//     const data = payload?.data || {};
//     const reference = data?.reference || payload?.reference;
//     const status = (data?.status || "").toLowerCase();

//     if (!reference) {
//       console.warn("Paystack webhook missing reference", payload);
//       return NextResponse.json({ error: "Missing reference" }, { status: 400 });
//     }

//     const tx = await Transaction.findOne({ txRef: reference });
//     if (!tx) {
//       console.warn("Paystack webhook transaction not found", reference);
//       return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
//     }

//     // Attach provider payload
//     tx.providerResponse = payload;

//     if (status === "success" || event === "charge.success") {
//       tx.status = "success";
//       await tx.save();

//       // amount in kobo; convert to NGN
//       const amount = Number(data?.amount || 0) / 100;
//       const wallet = await Wallet.findOne({ userId: tx.userId });
//       if (!wallet) {
//         console.warn("Wallet not found for tx user", tx.userId);
//         return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
//       }

//       wallet.balance = Number(wallet.balance) + Number(amount);
//       wallet.ledgerBalance = Number(wallet.ledgerBalance) + Number(amount);
//       await wallet.save();

//       return NextResponse.json({ ok: true });
//     }

//     tx.status = "failed";
//     await tx.save();
//     return NextResponse.json({ ok: true });
//   } catch (err: any) {
//     console.error("Paystack webhook error", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
