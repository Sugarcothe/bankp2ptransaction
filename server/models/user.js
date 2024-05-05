import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    walletId: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    fullName: { type: String },
    email: { type: String, required: true, trim: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    balance: { type: Number, default: 0.0 },
    pin: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);
export default mongoose.model("user", userSchema)
