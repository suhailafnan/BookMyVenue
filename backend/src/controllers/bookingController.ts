import { Response, NextFunction } from "express";
import { Booking } from "../models/Booking";
import { Venue } from "../models/Venue";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types";

/**
 * @route   POST /api/v1/bookings
 * @desc    Create a new booking and verify there are no overlapping dates for the venue
 * @access  Private
 */
export const createBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { venueId, startDate, endDate } = req.body;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    if (!venueId || !startDate || !endDate) {
      throw new AppError("Please provide venueId, startDate, and endDate.", 400);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // 1. Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new AppError("Please provide valid date inputs.", 400);
    }

    if (start < new Date()) {
      throw new AppError("Booking start date cannot be in the past.", 400);
    }

    if (end <= start) {
      throw new AppError("End date must be strictly after the start date.", 400);
    }

    // 2. Fetch the venue
    const venue = await Venue.findById(venueId);
    if (!venue) {
      throw new AppError("The target venue no longer exists.", 404);
    }

    // Prevent owners from booking their own venues (standard business logic)
    if (venue.owner.toString() === req.user._id.toString()) {
      throw new AppError("You cannot book your own venue.", 400);
    }

    // 3. Double-Booking Overlap Guard
    // Overlap formula: (existingStart <= newEnd) AND (existingEnd >= newStart)
    const overlappingBooking = await Booking.findOne({
      venue: venueId,
      status: { $in: ["pending", "confirmed"] }, // Ignore cancelled bookings
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (overlappingBooking) {
      throw new AppError("These booking dates are already taken. Please try another range.", 400);
    }

    // 4. Calculate pricing
    const timeDifference = end.getTime() - start.getTime();
    const billingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const calculatedPrice = billingDays * venue.pricePerDay;

    // 5. Create the booking document
    const booking = await Booking.create({
      venue: venueId,
      user: req.user._id,
      startDate: start,
      endDate: end,
      totalPrice: calculatedPrice,
      status: "pending", // Initially pending until payment confirms or admin approves
    });

    res.status(201).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   PATCH /api/v1/bookings/:id/cancel
 * @desc    Cancel an existing booking (Only by the booking creator, venue owner, or an admin)
 * @access  Private
 */
export const cancelBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    // Fetch the booking and populate venue owner for authority check
    const booking = await Booking.findById(id).populate({
      path: "venue",
      select: "owner",
    });

    if (!booking) {
      throw new AppError("No booking found with the provided ID.", 404);
    }

    if (booking.status === "cancelled") {
      throw new AppError("This booking is already cancelled.", 400);
    }

    // Authorization checks
    const isBookingCreator = booking.user.toString() === req.user._id.toString();
    const isVenueOwner =
      booking.venue &&
      (booking.venue as any).owner &&
      (booking.venue as any).owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isBookingCreator && !isVenueOwner && !isAdmin) {
      throw new AppError("You do not have permission to cancel this booking.", 403);
    }

    // Set cancellation properties
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      status: "success",
      message: "Booking has been cancelled successfully.",
      data: {
        booking,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/bookings/history
 * @desc    Fetch bookings made by the authenticated user
 * @access  Private
 */
export const getBookingHistory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    const bookings = await Booking.find({ user: req.user._id })
      .populate("venue")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/bookings/:id
 * @desc    Get detailed individual booking info (Only for guest booking, venue owner, or admin)
 * @access  Private
 */
export const getBookingDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    const booking = await Booking.findById(id)
      .populate("venue")
      .populate("user", "name email");

    if (!booking) {
      throw new AppError("Booking not found.", 404);
    }

    const isBookingCreator = booking.user._id.toString() === req.user._id.toString();
    const isVenueOwner =
      booking.venue &&
      (booking.venue as any).owner &&
      (booking.venue as any).owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isBookingCreator && !isVenueOwner && !isAdmin) {
      throw new AppError("You do not possess authorizations to view this booking's details.", 403);
    }

    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
