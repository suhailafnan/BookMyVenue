import mongoose, { Schema } from "mongoose";
import { IVenue } from "../types";

const venueSchema = new Schema<IVenue>(
  {
    name: {
      type: String,
      required: [true, "A venue must have a name."],
      trim: true,
      maxlength: [100, "A venue name must have less than or equal to 100 characters."],
    },
    description: {
      type: String,
      required: [true, "A venue must have a description."],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "A venue must have an address."],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "A venue must specify a city."],
      trim: true,
      lowercase: true,
    },
    capacity: {
      type: Number,
      required: [true, "A venue must specify user capacity."],
      min: [1, "Capacity must be at least 1 person."],
    },
    pricePerDay: {
      type: Number,
      required: [true, "A venue must specify a price per day."],
      min: [0, "Price per day cannot be negative."],
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above or equal to 0."],
      max: [5, "Rating must be below or equal to 5."],
      set: (val: number) => Math.round(val * 10) / 10, // Rounds rating to 1 decimal place
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A venue must have an owner context."],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster lookups and query optimizations
venueSchema.index({ owner: 1 });
venueSchema.index({ city: 1 });
venueSchema.index({ pricePerDay: 1 });

// Full text compound index for robust, powerful search queries across name, description, city, and address
venueSchema.index(
  {
    name: "text",
    description: "text",
    city: "text",
    address: "text",
  },
  {
    weights: {
      name: 10,
      city: 5,
      description: 2,
      address: 1,
    },
    name: "VenueTextIndex",
  }
);

export const Venue = mongoose.model<IVenue>("Venue", venueSchema);
