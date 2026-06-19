import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

/**
 * Express middleware to protect access to private API endpoints.
 * Validates the JWT Bearer token and attaches the authenticated user
 * to the incoming request object so downstream controllers can use it.
 */
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // 1. Scan the authorization header for the Bearer token scheme
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("You are not logged in. Please supply a valid bearer token to gain access.", 401);
    }

    // 2. Validate the JWT token structure and signature
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is missing from configuration.");
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, secret) as DecodedToken;
    } catch (jwtErr: any) {
      if (jwtErr.name === "TokenExpiredError") {
        throw new AppError("Your session token has expired. Please log in again.", 401);
      }
      throw new AppError("Invalid session token. Please log in again.", 401);
    }

    // 3. Ensure the user associated with this token still exists in MongoDB
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new AppError("The user belonging to this token no longer exists on our system.", 401);
    }

    // 4. Attach token user object context for subsequent downstream middleware/endpoint controller logic
    req.user = currentUser;
    next();
  } catch (err: any) {
    next(err);
  }
};
