import mongoose, { Schema } from "mongoose";
import { IWishlist } from "../types";

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A wishlist must belong to a user."],
      unique: true, // One wishlist document per user containing their array of venue references
    },
    venues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Venue",
      },
    ],
  },
  {
    timestamps: true,
  }
);

wishlistSchema.index({ user: 1 });

export const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
