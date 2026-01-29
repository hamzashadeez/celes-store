import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    ledgerBalance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "NGN",
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    pin: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models["Wallet"] || mongoose.model("Wallet", walletSchema);
