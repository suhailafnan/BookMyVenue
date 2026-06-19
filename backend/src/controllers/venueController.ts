import { Request, Response, NextFunction } from "express";
import { Venue } from "../models/Venue";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types";

/**
 * @route   POST /api/v1/venues
 * @desc    Creates a new venue with the active user as owner.
 * @access  Private (Requires Authentication)
 */
export const createVenue = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, address, city, capacity, pricePerDay, images, amenities } = req.body;

    // 1. Basic validation
    if (!name || !description || !address || !city || !capacity || !pricePerDay) {
      throw new AppError("Please provide all required fields: name, description, address, city, capacity, and pricePerDay.", 400);
    }

    if (!req.user) {
      throw new AppError("No authenticated user session found.", 401);
    }

    // 2. Build and save the venue linked to the current logged-in user as the owner
    const newVenue = await Venue.create({
      name,
      description,
      address,
      city,
      capacity,
      pricePerDay,
      images: images || [],
      amenities: amenities || [],
      owner: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        venue: newVenue,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   PATCH /api/v1/venues/:id
 * @desc    Update editable features of a venue. Restricted to owner or administrators.
 * @access  Private (Requires Authentication)
 */
export const updateVenue = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError("No authenticated user session found.", 401);
    }

    // 1. Locate the venue
    const venue = await Venue.findById(id);
    if (!venue) {
      throw new AppError("No venue found matching the provided ID.", 404);
    }

    // 2. Authorized check: Must be owner or admin
    const isOwner = venue.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError("You do not have permission to update this venue.", 403);
    }

    // 3. Update fields dynamically
    const fieldsToUpdate = [
      "name",
      "description",
      "address",
      "city",
      "capacity",
      "pricePerDay",
      "images",
      "amenities",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        (venue as any)[field] = req.body[field];
      }
    });

    const updatedVenue = await venue.save();

    res.status(200).json({
      status: "success",
      data: {
        venue: updatedVenue,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   DELETE /api/v1/venues/:id
 * @desc    Delete a venue permanently from the system. Restricted to owner or administrators.
 * @access  Private (Requires Authentication)
 */
export const deleteVenue = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError("No authenticated user session found.", 401);
    }

    // 1. Locate the venue
    const venue = await Venue.findById(id);
    if (!venue) {
      throw new AppError("No venue found matching the provided ID.", 404);
    }

    // 2. Authorization validation: Must be owner or admin
    const isOwner = venue.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError("You do not have permission to delete this venue.", 403);
    }

    // 3. Perform delete
    await Venue.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Venue successfully removed from database.",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/venues/:id
 * @desc    Obtain detailed profile of single venue by its ID, with owner profile nested.
 * @access  Public
 */
export const getVenueById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const venue = await Venue.findById(id).populate("owner", "name email");
    if (!venue) {
      throw new AppError("No venue found matching the provided ID.", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        venue,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/venues
 * @desc    Gets all venues with optional standard pricing and location filtering, sorting and paging.
 * @access  Public
 */
export const getAllVenues = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const queryObj = { ...req.query };
    
    // Items to exclude from database query filtering
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Construct structured database query
    let filterQuery: any = {};

    // 1. Filter by location/city (case-insensitive direct match)
    if (queryObj.city) {
      filterQuery.city = (queryObj.city as string).toLowerCase();
    }

    // 2. Filter by minimum and maximum capacities
    if (queryObj.minCapacity) {
      filterQuery.capacity = { ...filterQuery.capacity, $gte: Number(queryObj.minCapacity) };
    }
    if (queryObj.maxCapacity) {
      filterQuery.capacity = { ...filterQuery.capacity, $lte: Number(queryObj.maxCapacity) };
    }

    // 3. Filter by pricing range ($gte & $lte)
    if (queryObj.minPrice || queryObj.maxPrice) {
      filterQuery.pricePerDay = {};
      if (queryObj.minPrice) {
        filterQuery.pricePerDay.$gte = Number(queryObj.minPrice);
      }
      if (queryObj.maxPrice) {
        filterQuery.pricePerDay.$lte = Number(queryObj.maxPrice);
      }
    }

    // 4. Filter by specific amenities (supported via array contents)
    if (queryObj.amenities) {
      const amenitiesList = (queryObj.amenities as string).split(",");
      filterQuery.amenities = { $all: amenitiesList };
    }

    // Initiate Mongoose query
    let query = Venue.find(filterQuery);

    // 5. Apply sorting algorithms (default sorting by creation date DESC)
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 6. Execute full DB fetch
    const venues = await query.populate("owner", "name email");

    res.status(200).json({
      status: "success",
      results: venues.length,
      data: {
        venues,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/venues/search/query
 * @desc    Highly optimized full-text search endpoint using the created complex text weights.
 * @access  Public
 */
export const searchVenues = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      throw new AppError("Search query string 'q' is required for matching text parameters.", 400);
    }

    // 1. Query matching using text index mechanism.
    // Mongoose meta-score helps sort by how closely matched the document results are to search term.
    const venues = await Venue.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("owner", "name email");

    res.status(200).json({
      status: "success",
      results: venues.length,
      data: {
        venues,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
