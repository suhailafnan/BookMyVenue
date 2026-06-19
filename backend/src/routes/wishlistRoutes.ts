import { Router } from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlistController";
import { protect } from "../middlewares/auth";

const router = Router();

// Secure all wishlist endpoints
router.use(protect as any);

// 1. Get user's complete wishlist
router.get("/", getWishlist as any);

// 2. Add venue to wishlist
router.post("/add", addToWishlist as any);

// 3. Remove venue from wishlist
router.delete("/remove/:venueId", removeFromWishlist as any);

export default router;
