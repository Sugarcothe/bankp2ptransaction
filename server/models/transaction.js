import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    sender_walletId: { type: String, required: true, trim: true },
    receiver_walletId: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, default: 0.0 },
    message: { type: String, Default: `Funded succesfully`, timestamps: true },
    status: {
      type: String,
      default: "Succesful",
      enum: ["Declined", "Succesful"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("transaction", transactionSchema);
