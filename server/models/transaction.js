import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    sender_walletId: { type: String, required: true, trim: true },
    receiver_walletId: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, default: 0.0 },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("transaction", transactionSchema);
