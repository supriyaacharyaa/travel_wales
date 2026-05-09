// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },

  amount: Number,
  method: String, // bank / stripe / khalti

  transactionId: String,

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);