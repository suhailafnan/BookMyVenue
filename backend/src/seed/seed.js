const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const env = require("../config/env");

dotenv.config();

const categories = [
  {
    name: "Wedding",
    description: "Elegant halls, lawns, and palaces for wedding celebrations.",
    image: "/uploads/1781556576433-hero.jpg",
  },
  {
    name: "Corporate",
    description: "Conference venues and board-ready event spaces.",
    image: "/uploads/1781556576433-hero.jpg",
  },
  {
    name: "Banquet",
    description: "Premium banquet spaces for private and social gatherings.",
    image: "/uploads/1781556576433-hero.jpg",
  },
  {
    name: "Outdoor",
    description: "Open-air gardens and destination venues.",
    image: "/uploads/1781556576433-hero.jpg",
  },
];

const products = [
  {
    name: "The Royal Courtyard",
    description:
      "A premium wedding venue with a landscaped lawn, grand dining hall, and dedicated guest arrival lounge.",
    price: 185000,
    stock: 14,
    image: "1781556576433-hero.jpg",
    category: "Wedding",
    metadata: {
      capacity: 800,
      location: "Bangalore",
      address: "Indiranagar, Bangalore, Karnataka",
      parking: true,
      ac: true,
      wifi: true,
      amenities: ["Bridal suite", "Stage decor", "Valet parking", "Catering"],
      contactName: "Ananya Rao",
      contactPhone: "+91 98765 43210",
      availableDates: ["2026-07-04", "2026-07-12", "2026-08-02"],
    },
  },
  {
    name: "Amber Convention Hall",
    description:
      "A flexible convention venue with modular seating, acoustic panels, and high-speed presentation support.",
    price: 95000,
    stock: 8,
    image: "1781556576433-hero.jpg",
    category: "Corporate",
    metadata: {
      capacity: 420,
      location: "Chennai",
      address: "T. Nagar, Chennai, Tamil Nadu",
      parking: true,
      ac: true,
      wifi: true,
      amenities: ["Projector", "Green room", "Buffet area", "AV support"],
      contactName: "Karthik Menon",
      contactPhone: "+91 97865 21043",
      availableDates: ["2026-07-08", "2026-07-18", "2026-08-11"],
    },
  },
  {
    name: "Parchment Banquet House",
    description:
      "A warm, intimate banquet venue for milestone events, receptions, and curated dining experiences.",
    price: 72000,
    stock: 18,
    image: "1781556576433-hero.jpg",
    category: "Banquet",
    metadata: {
      capacity: 260,
      location: "Coimbatore",
      address: "RS Puram, Coimbatore, Tamil Nadu",
      parking: true,
      ac: true,
      wifi: false,
      amenities: ["Catering", "Stage lighting", "Guest lounge", "Lift access"],
      contactName: "Priya Narayan",
      contactPhone: "+91 90909 11223",
      availableDates: ["2026-07-03", "2026-07-25", "2026-08-15"],
    },
  },
  {
    name: "Slate Sky Gardens",
    description:
      "An outdoor garden venue with covered dining, skyline views, and evening event lighting.",
    price: 135000,
    stock: 5,
    image: "1781556576433-hero.jpg",
    category: "Outdoor",
    metadata: {
      capacity: 650,
      location: "Hyderabad",
      address: "Jubilee Hills, Hyderabad, Telangana",
      parking: true,
      ac: false,
      wifi: true,
      amenities: ["Open lawn", "Covered dining", "Live counter", "Photo wall"],
      contactName: "Sameer Khan",
      contactPhone: "+91 99887 77665",
      availableDates: ["2026-07-14", "2026-08-09", "2026-08-30"],
    },
  },
  {
    name: "Deep Navy Boardroom",
    description:
      "A polished executive venue for leadership offsites, workshops, and invite-only launches.",
    price: 48000,
    stock: 22,
    image: "1781556576433-hero.jpg",
    category: "Corporate",
    metadata: {
      capacity: 90,
      location: "Kochi",
      address: "Marine Drive, Kochi, Kerala",
      parking: false,
      ac: true,
      wifi: true,
      amenities: ["Boardroom", "Coffee service", "Screen", "Writing walls"],
      contactName: "Meera Thomas",
      contactPhone: "+91 93456 78120",
      availableDates: ["2026-07-06", "2026-07-20", "2026-08-18"],
    },
  },
  {
    name: "Walnut Heritage Mahal",
    description:
      "A stately celebration venue with traditional detailing, rich interiors, and large guest movement zones.",
    price: 210000,
    stock: 11,
    image: "1781556576433-hero.jpg",
    category: "Wedding",
    metadata: {
      capacity: 1200,
      location: "Trivandrum",
      address: "Kowdiar, Trivandrum, Kerala",
      parking: true,
      ac: true,
      wifi: true,
      amenities: ["Procession entry", "VIP rooms", "Dining hall", "Decor team"],
      contactName: "Vikram Nair",
      contactPhone: "+91 91234 56780",
      availableDates: ["2026-07-21", "2026-08-06", "2026-09-04"],
    },
  },
];

const seed = async () => {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is required to seed BookMyVenue");
  }

  await mongoose.connect(env.mongoUri);
  await Product.deleteMany();
  await Category.deleteMany();

  const createdCategories = await Category.insertMany(categories);
  const categoryMap = createdCategories.reduce((map, category) => {
    map[category.name] = category._id;
    return map;
  }, {});

  await Product.insertMany(
    products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }))
  );

  await mongoose.disconnect();
  console.log("BookMyVenue seed data imported");
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
