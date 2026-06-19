import { Router } from "express";
import {
  createVenue,
  updateVenue,
  deleteVenue,
  getVenueById,
  getAllVenues,
  searchVenues,
} from "../controllers/venueController";
import { protect } from "../middlewares/auth";

const router = Router();

// Public routes

// 1. Get all venues with filters
router.get("/", getAllVenues);

// 2. Perform text search (Important: must reside above /:id so it takes routing precedence)
router.get("/search", searchVenues);

// 3. Obtain a single venue
router.get("/:id", getVenueById);

// Protected routes (Require authentication Bearer session token)

// 4. Create a new venue
router.post("/", protect as any, createVenue as any);

// 5. Update an existing venue (Authorized checking occurs in the controller)
router.patch("/:id", protect as any, updateVenue as any);

// 6. Delete a venue (Authorized checking occurs in the controller)
router.delete("/:id", protect as any, deleteVenue as any);

export default router;
