import { Router } from "express";
import {
  createBooking,
  cancelBooking,
  getBookingHistory,
  getBookingDetails,
} from "../controllers/bookingController";
import { protect } from "../middlewares/auth";
import { validateRequestBody } from "../middlewares/validateRequest";

const router = Router();

// Secure all booking endpoints (Requires valid JWT session authentication)
router.use(protect as any);

const createBookingValidation = validateRequestBody([
  {
    field: "venueId",
    required: true,
    type: "string",
  },
  {
    field: "startDate",
    required: true,
    type: "date",
  },
  {
    field: "endDate",
    required: true,
    type: "date",
  },
]);

// 1. Create a Booking
router.post("/", createBookingValidation as any, createBooking as any);

// 2. Fetch authenticated user's booking history
router.get("/history", getBookingHistory as any);

// 3. Fetch specific booking detailed info
router.get("/:id", getBookingDetails as any);

// 4. Cancel a booking
router.patch("/:id/cancel", cancelBooking as any);

export default router;
