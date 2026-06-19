import { Response, NextFunction } from "express";
import { Wishlist } from "../models/Wishlist";
import { Venue } from "../models/Venue";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types";

/**
 * @route   POST /api/v1/wishlist/add
 * @desc    Add a venue to the authenticated user's wishlist
 * @access  Private
 */
export const addToWishlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { venueId } = req.body;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    if (!venueId) {
      throw new AppError("Please provide a valid venueId in the payload body.", 400);
    }

    // 1. Verify that the target venue actually exists in our collections
    const venue = await Venue.findById(venueId);
    if (!venue) {
      throw new AppError("The requested venue does not exist.", 404);
    }

    // 2. Safely find or create the wishlist document and append the venueId avoiding duplicates
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { venues: venueId } },
      { new: true, upsert: true }
    ).populate("venues");

    res.status(200).json({
      status: "success",
      message: "Venue added to your wishlist.",
      data: {
        wishlist,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   DELETE /api/v1/wishlist/remove/:venueId
 * @desc    Remove a venue from the authenticated user's wishlist
 * @access  Private
 */
export const removeFromWishlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { venueId } = req.params;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    if (!venueId) {
      throw new AppError("Please provide a venueId route parameter.", 400);
    }

    // Pull the venue from the wishlist array
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { venues: venueId } },
      { new: true }
    ).populate("venues");

    res.status(200).json({
      status: "success",
      message: "Venue removed from your wishlist.",
      data: {
        wishlist: wishlist || { user: req.user._id, venues: [] },
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/wishlist
 * @desc    Retrieve the wishlist document with populated details for the user
 * @access  Private
 */
export const getWishlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("venues");

    // If no document exists in database yet, we present initialized response
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        venues: [],
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        wishlist,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
