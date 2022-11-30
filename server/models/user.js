const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    walletId: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    balance: { type: Number, default: 0.0 },
    otp: { type: String, default: "" },
    pin: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
