import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types";

/**
 * Helper to generate a secure JWT token signed with JWT_SECRET.
 */
const signToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is missing from configuration.");
  }
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * @route   POST /api/v1/auth/register
 * @desc    Registers a new user and returns a session JWT token.
 * @access  Public
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1. Inputs validation
    if (!name || !email || !password) {
      throw new AppError("Please provide name, email, and password.", 400);
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("An account with this email address already exists.", 400);
    }

    // 3. Create the user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Remove the password field from the response object
    newUser.password = undefined;

    // 4. Generate JWT token
    const token = signToken(newUser._id.toString());

    // 5. Send Response
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticates credentials and returns a session JWT token.
 * @access  Public
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Verify body inputs exist
    if (!email || !password) {
      throw new AppError("Please provide both email and password.", 400);
    }

    // 2. Fetch the user with password field checked (since password select is false by default)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("Incorrect email or password.", 401);
    }

    // 3. Compare the candidate password
    const isMatched = await user.comparePassword(password, user.password!);
    if (!isMatched) {
      throw new AppError("Incorrect email or password.", 401);
    }

    // Remove password field before returning data
    user.password = undefined;

    // 4. Sign token
    const token = signToken(user._id.toString());

    // 5. Response delivery
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/auth/me
 * @desc    Fetches authenticated user profile from token context.
 * @access  Private (Requires Auth Middleware)
 */
export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The user object is placed on req.user by our protect/auth middleware
    const currentUser = req.user;

    if (!currentUser) {
      throw new AppError("No authenticated user active in session context.", 401);
    }

    res.status(200).json({
      status: "success",
      data: {
        user: currentUser,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
