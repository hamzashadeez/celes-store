import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/connectDB";
import requireAuth from "@/middlewares/authMiddleware";
import Wallet from "@/models/walletModel";
import Dataplanlist from "@/data";
import Transaction from "@/models/transactionModel";
import axios from "axios";

type Body = {
  network?: string;
  category?: string;
  planId?: number | string;
  phone?: string;
  pin?: string;
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    const userId = (auth as any).id?.toString?.() ?? (auth as any).id;
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: Body = await request.json().catch(() => ({}) as Body);
    const { network, category, planId, phone, pin } = body;

    if (!network)
      return NextResponse.json(
        { error: "Network is required" },
        { status: 400 },
      );
    if (!category)
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 },
      );
    if (!planId)
      return NextResponse.json({ error: "Plan is required" }, { status: 400 });
    if (!phone)
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 },
      );
    if (!pin || String(pin).length !== 4)
      return NextResponse.json({ error: "Invalid PIN" }, { status: 400 });

    // find plan
    const networkObj: any = (Dataplanlist as any)[network];
    if (!networkObj)
      return NextResponse.json({ error: "Invalid network" }, { status: 400 });

    const categoryArr: any[] = networkObj[category];
    if (!Array.isArray(categoryArr))
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });

    const pid = Number(planId);
    const plan = categoryArr.find((p: any) => Number(p.id) === pid);
    if (!plan)
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });

    const amount = Number(plan.amount || 0);
    if (!amount || amount <= 0)
      return NextResponse.json(
        { error: "Invalid plan amount" },
        { status: 400 },
      );

    // load wallet
    const wallet = await Wallet.findOne({ userId });
    if (!wallet)
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    if (wallet.isLocked)
      return NextResponse.json({ error: "Wallet is locked" }, { status: 403 });
    if (String(wallet.pin) !== String(pin))
      return NextResponse.json(
        { error: "Invalid wallet PIN" },
        { status: 401 },
      );
    if (Number(wallet.balance) < amount)
      return NextResponse.json(
        { error: "Insufficient funds" },
        { status: 400 },
      );

    // call provider or simulate — prefer provider token, otherwise basic auth, otherwise simulate
    // Use the single, canonical provider URL for data as requested
    const providerUrl = "https://bilalsadasub.com/api/data";

    try {
      let providerResponse: any = null;

      const headers: any = { "Content-Type": "application/json" };
      if (process.env.TOKEN) {
        headers.Authorization = `Token ${process.env.TOKEN}`;
      } else if (
        process.env.BILALSADASUB_USERNAME &&
        process.env.BILALSADASUB_PASSWORD
      ) {
        const creds = Buffer.from(
          `${process.env.BILALSADASUB_USERNAME}:${process.env.BILALSADASUB_PASSWORD}`,
        ).toString("base64");
        headers.Authorization = `Basic ${creds}`;
      }

      // Call the single provider endpoint for data
      let network_id;
      if (network === "mtn") network_id = 1;
      else if (network === "glo") network_id = 3;
      else if (network === "airtel") network_id = 2;
      else if (network === "9mobile") network_id = 4;
      try {
        const res = await axios.post(
          providerUrl,
          {
            network: network_id,
            data_plan: pid,
            phone,
            bypass: false,
            "request-id": `DATA-${Date.now()}`,
          },
          { headers },
        );
        providerResponse = res.data;
      } catch (err: any) {
        const message = err?.response?.data || err?.message || "Provider error";
        // record failed transaction for audit
        const failRef = `FAIL-DATA-${Date.now()}`;
        await Transaction.create({
          userId,
          type: "data",
          amount,
          txRef: failRef,
          providerResponse: err?.response?.data || { message },
          meta: { network, category, plan: plan.name, phone },
          status: "failed",
        });

        return NextResponse.json(
          { error: "Provider error", details: message },
          { status: 502 },
        );
      }

      // Determine success from provider response
      const success =
        providerResponse?.status === "success" ||
        providerResponse?.success === true ||
        (providerResponse?.code &&
          String(providerResponse.code).startsWith("2"));

      if (!success) {
        const txRefFail =
          providerResponse?.txRef ||
          providerResponse?.reference ||
          `FAIL-DATA-${Date.now()}`;
        await Transaction.create({
          userId,
          type: "data",
          amount,
          txRef: txRefFail,
          providerResponse,
          meta: { network, category, plan: plan.name, phone },
          status: "failed",
        });

        return NextResponse.json(
          { error: "Provider reported failure", provider: providerResponse },
          { status: 502 },
        );
      }

      // Deduct wallet on success
      wallet.balance = Number(wallet.balance) - amount;
      wallet.ledgerBalance = Number(wallet.ledgerBalance) - amount;
      await wallet.save();

      // record successful transaction
      const txRef =
        providerResponse?.txRef ||
        providerResponse?.reference ||
        `SIM-DATA-${Date.now()}`;
      await Transaction.create({
        userId,
        type: "data",
        amount,
        txRef,
        providerResponse,
        meta: { network, category, plan: plan.name, phone },
        status: "success",
      });

      return NextResponse.json(
        {
          message: "Data purchase successful",
          provider: providerResponse,
          wallet,
          txRef,
        },
        { status: 200 },
      );
    } catch (err: any) {
      console.error(
        "Provider call error:",
        err?.response || err?.message || err,
      );
      return NextResponse.json(
        {
          error: "Failed to purchase data",
          details: err?.response?.data || err?.message,
        },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("buy/data error:", error);
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST to buy data" });
}
