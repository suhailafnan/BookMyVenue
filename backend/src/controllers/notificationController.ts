import { Request, Response, NextFunction } from "express";
import { Notification } from "../models/Notification";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types";

/**
 * Helper to seamlessly dispatch a database notification to any recipient.
 * Can be called internally from other controllers (Booking/Payment engines) easily.
 */
export const createNotificationHelper = async (
  userId: string,
  title: string,
  message: string,
  type: "booking" | "payment" | "info" = "info"
): Promise<any> => {
  try {
    return await Notification.create({
      user: userId,
      title,
      message,
      type,
    });
  } catch (error: any) {
    console.error(`Failed to dispatch background notification: ${error.message}`);
  }
};

/**
 * @route   POST /api/v1/notifications
 * @desc    Submit a custom notification (e.g. for broadcast alerts)
 * @access  Private
 */
export const createNotification = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, title, message, type } = req.body;

    if (!userId || !title || !message) {
      throw new AppError("Please provide userId, title, and message fields.", 400);
    }

    const newNotification = await Notification.create({
      user: userId,
      title,
      message,
      type: type || "info",
    });

    res.status(201).json({
      status: "success",
      data: {
        notification: newNotification,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   PATCH /api/v1/notifications/:id/read
 * @desc    Mark a specific notification as read.
 * @access  Private
 */
export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    const notification = await Notification.findById(id);

    if (!notification) {
      throw new AppError("No notification found matching that ID.", 404);
    }

    // Security check: Match logged in user to notification owner
    if (notification.user.toString() !== req.user._id.toString()) {
      throw new AppError("You do not have access authorization to read this notification.", 403);
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      status: "success",
      data: {
        notification,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/notifications
 * @desc    Retrieve all notifications belonging to the logged in user
 * @access  Private
 */
export const getMyNotifications = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("No authenticated session user found.", 401);
    }

    const notifications = await Notification.find({ user: req.user._id }).sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: notifications.length,
      data: {
        notifications,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
