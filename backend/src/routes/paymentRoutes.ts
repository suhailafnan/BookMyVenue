import { Router } from "express";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controllers/paymentController";
import { protect } from "../middlewares/auth";
import { validateRequestBody } from "../middlewares/validateRequest";

const router = Router();

// All payment management routes require user authentication
router.use(protect as any);

const createOrderValidation = validateRequestBody([
  {
    field: "bookingId",
    required: true,
    type: "string",
  },
]);

const verifyPaymentValidation = validateRequestBody([
  {
    field: "razorpayOrderId",
    required: true,
    type: "string",
  },
  {
    field: "razorpayPaymentId",
    required: true,
    type: "string",
  },
  {
    field: "razorpaySignature",
    required: true,
    type: "string",
  },
]);

// 1. Initiate Checkout (creates order, returns Razorpay Order ID)
router.post("/order", createOrderValidation as any, createRazorpayOrder as any);

// 2. Complete Transaction (validates secure signatures and maps bookings status)
router.post("/verify", verifyPaymentValidation as any, verifyRazorpayPayment as any);

export default router;
