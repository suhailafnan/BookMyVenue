import mongoose, { Schema } from "mongoose";
import { IPayment } from "../types";

const paymentSchema = new Schema<IPayment>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "A payment record must reference a booking."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A payment record must belong to a user."],
    },
    razorpayOrderId: {
      type: String,
      required: [true, "A payment record must track a Razorpay Order ID."],
      unique: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "A payment record must capture the payment value."],
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ user: 1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ razorpayOrderId: 1 });

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
