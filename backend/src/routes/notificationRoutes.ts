import { Router } from "express";
import {
  createNotification,
  markNotificationAsRead,
  getMyNotifications,
} from "../controllers/notificationController";
import { protect } from "../middlewares/auth";

const router = Router();

// Secure all incoming endpoints
router.use(protect as any);

// 1. Get active session notifications
router.get("/", getMyNotifications as any);

// 2. Mark single alert as read
router.patch("/:id/read", markNotificationAsRead as any);

// 3. Trigger alert creation
router.post("/", createNotification as any);

export default router;
