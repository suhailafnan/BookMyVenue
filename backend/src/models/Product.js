// Import Mongoose
const mongoose = require("mongoose");

// Create Product Schema
const productSchema = new mongoose.Schema(
  {
    // Product Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Product Description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Product Price
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    pricePerHour: {
      type: Number,
      default: 0,
      min: 0,
    },
    pricePerDay: {
      type: Number,
      default: 0,
      min: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Category Reference
    // Stores Category ID from MongoDB
    category: {
      // MongoDB Object ID
      type: mongoose.Schema.Types.ObjectId,

      // Connects to Category Model
      ref: "Category",

      required: true,
    },

    // Available Stock
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Product Image Name
    image: {
      type: String,
      trim: true,
    },

    metadata: {
      capacity: {
        type: Number,
        default: 0,
        min: 0,
      },
      location: {
        type: String,
        trim: true,
        default: "",
      },
      address: {
        type: String,
        trim: true,
        default: "",
      },
      parking: {
        type: Boolean,
        default: false,
      },
      ac: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
      foodAvailable: {
        type: Boolean,
        default: false,
      },
      googleMapsLink: {
        type: String,
        trim: true,
        default: "",
      },
      amenities: {
        type: [String],
        default: [],
      },
      contactName: {
        type: String,
        trim: true,
        default: "",
      },
      contactPhone: {
        type: String,
        trim: true,
        default: "",
      },
      availableDates: {
        type: [String],
        default: [],
      },
      blockedDates: {
        type: [String],
        default: [],
      },
      images: {
        type: [String],
        default: [],
      },
      timeSlots: {
        startTime: {
          type: String,
          default: "09:00",
        },
        endTime: {
          type: String,
          default: "18:00",
        },
        slotDuration: {
          type: Number,
          default: 60,
          min: 15,
        },
      },
    },
  },
  {
    // Automatically creates:
    // createdAt
    // updatedAt
    timestamps: true,
  }
);

// Export Product Model
module.exports = mongoose.model("Product", productSchema);
