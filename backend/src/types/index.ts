import { Document, Types } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string, userHash: string): Promise<boolean>;
}

export interface IVenue extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  address: string;
  city: string;
  capacity: number;
  pricePerDay: number;
  images: string[];
  amenities: string[];
  rating: number;
  numReviews: number;
  owner: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking extends Document {
  _id: Types.ObjectId;
  venue: Types.ObjectId | IVenue;
  user: Types.ObjectId | IUser;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishlist extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  venues: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment extends Document {
  _id: Types.ObjectId;
  booking: Types.ObjectId | IBooking;
  user: Types.ObjectId | IUser;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  title: string;
  message: string;
  type: "booking" | "payment" | "info";
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}
