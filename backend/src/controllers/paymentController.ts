import { Response, NextFunction } from "express";
import crypto from "crypto";
import { getRazorpayInstance } from "../config/razorpay";
import { Booking } from "../models/Booking";
import { Payment } from "../models/Payment";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types";
import { createNotificationHelper } from "./notificationController";

/**
 * @route   POST /api/v1/payments/order
 * @desc    Initializes a Razorpay order from a valid booking context
 * @access  Private
 */
export const createRazorpayOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { bookingId } = req.body;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    if (!bookingId) {
      throw new AppError("Please provide a valid bookingId to proceed.", 400);
    }

    // 1. Fetch the booking metadata
    const booking = await Booking.findById(bookingId).populate("venue");
    if (!booking) {
      throw new AppError("No booking found with the provided ID.", 404);
    }

    // Security verify: Booking creator is initiating checkpoint payment
    if (booking.user.toString() !== req.user._id.toString()) {
      throw new AppError("You are not authorized to pay for this booking.", 403);
    }

    if (booking.status === "cancelled") {
      throw new AppError("You cannot initiate payment for a cancelled booking.", 400);
    }

    // 2. Fetch Razorpay client instance lazily
    const razorpay = getRazorpayInstance();

    // 3. Create options (Razorpay operates amounts in subunits: paise for INR)
    const amountInPaise = Math.round(booking.totalPrice * 100);
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_booking_${booking._id}`,
    };

    // 4. Initialize Razorpay Server order
    const order = await razorpay.orders.create(options);

    // 5. Build payment record in DB with status "created"
    await Payment.create({
      booking: booking._id,
      user: req.user._id,
      razorpayOrderId: order.id,
      amount: booking.totalPrice,
      currency: "INR",
      status: "created",
    });

    // 6. Deliver Order details to client
    res.status(201).json({
      status: "success",
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID, // Frontend consumes this to mount popup config
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   POST /api/v1/payments/verify
 * @desc    Verifies Razorpay's cryptographic callback signature and activates booking status
 * @access  Private
 */
export const verifyRazorpayPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      throw new AppError("Missing Razorpay checkout confirmation fields. razorpayOrderId, razorpayPaymentId, and razorpaySignature are required.", 400);
    }

    // 1. Fetch matching payment model logging
    const payment = await Payment.findOne({ razorpayOrderId }).populate({
      path: "booking",
      populate: {
        path: "venue",
      }
    });

    if (!payment) {
      throw new AppError("Payment transaction matching this order reference was not located.", 404);
    }

    // 2. Verify callback payload signatures (Uses SHA256 HMAC)
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      throw new Error("Razorpay credentials keySecret is unassigned in the backend system.");
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      payment.status = "failed";
      await payment.save();
      throw new AppError("Payment signature validation failed. Transaction rejected.", 400);
    }

    // 3. Mark payment as successfully paid
    payment.status = "paid";
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    await payment.save();

    // 4. Update the Booking model state to "confirmed"
    const booking = await Booking.findById(payment.booking);
    if (booking) {
      booking.status = "confirmed";
      await booking.save();

      // 5. Send automated confirmation notifications in the background
      const venueName = (booking.venue as any)?.name || "selected venue";
      const venueOwnerId = (booking.venue as any)?.owner;

      // Notice to Guest
      await createNotificationHelper(
        booking.user.toString(),
        "Payment Confirmed! 🎉",
        `Your billing of INR ${booking.totalPrice} for venue '${venueName}' completed successfully. Your booking is confirmed!`,
        "payment"
      );

      // Notice to Venue Owner
      if (venueOwnerId) {
        await createNotificationHelper(
          venueOwnerId.toString(),
          "New Confirmed Booking! 💼",
          `A booking on '${venueName}' has been successfully paid and scheduled. Dates: ${booking.startDate.toLocaleDateString()} to ${booking.endDate.toLocaleDateString()}`,
          "booking"
        );
      }
    }

    res.status(200).json({
      status: "success",
      message: "Payment successfully verified and booking has been confirmed.",
      data: {
        payment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
