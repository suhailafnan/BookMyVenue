const Product = require("../models/Product");
const Category = require("../models/Category");
const env = require("../config/env");
const ApiError = require("../utils/apiError");

const compact = (payload) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseMetadata = (metadata) => {
  if (!metadata) {
    return undefined;
  }

  if (typeof metadata === "string") {
    return JSON.parse(metadata);
  }

  return metadata;
};

const productPayload = (body, file) =>
  compact({
    name: body.name,
    description: body.description,
    price: body.price,
    pricePerHour: body.pricePerHour,
    pricePerDay: body.pricePerDay,
    stock: body.stock,
    image: file ? file.filename : body.image,
    owner: body.owner,
    metadata: parseMetadata(body.metadata),
    category: body.category,
  });

const getCategoryFilter = async (category) => {
  if (!category) {
    return undefined;
  }

  if (/^[0-9a-fA-F]{24}$/.test(category)) {
    return category;
  }

  const categoryDoc = await Category.findOne({
    name: { $regex: `^${escapeRegex(category)}$`, $options: "i" },
  });

  return categoryDoc?._id;
};

const buildProductQuery = async (query) => {
  const { search, keyword, category, minPrice, maxPrice } = query;
  const filter = {};
  const searchTerm = search || keyword;

  if (searchTerm) {
    filter.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { "metadata.location": { $regex: searchTerm, $options: "i" } },
    ];
  }

  const categoryFilter = await getCategoryFilter(category);

  if (category && !categoryFilter) {
    return { filter, hasMissingCategory: true };
  }

  if (categoryFilter) {
    filter.category = categoryFilter;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  return { filter, hasMissingCategory: false };
};

const getProducts = async (query) => {
  const { sort = "createdAt:desc", page = 1, limit = 10 } = query;
  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 50);
  const skip = (pageNumber - 1) * limitNumber;
  const { filter, hasMissingCategory } = await buildProductQuery(query);

  if (hasMissingCategory) {
    return {
      products: [],
      pagination: { page: pageNumber, limit: limitNumber, total: 0, pages: 0 },
      inventory: {
        lowStockThreshold: env.lowStockThreshold,
        lowStockCount: 0,
      },
    };
  }

  const sortMap = {
    "price:asc": { price: 1 },
    "price:desc": { price: -1 },
    "name:asc": { name: 1 },
    "createdAt:asc": { createdAt: 1 },
    "createdAt:desc": { createdAt: -1 },
  };

  const [products, total, lowStockCount] = await Promise.all([
    Product.find(filter)
      .populate("category")
      .sort(sortMap[sort] || sortMap["createdAt:desc"])
      .skip(skip)
      .limit(limitNumber),
    Product.countDocuments(filter),
    Product.countDocuments({ stock: { $lte: env.lowStockThreshold } }),
  ]);

  return {
    products,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      pages: Math.ceil(total / limitNumber),
    },
    inventory: {
      lowStockThreshold: env.lowStockThreshold,
      lowStockCount,
    },
  };
};

const createProduct = async (body, file) => {
  const product = await Product.create(productPayload(body, file));
  return product.populate("category");
};

const createOwnerProduct = async (ownerId, body, file) => {
  const payload = productPayload({ ...body, owner: ownerId }, file);
  const price = payload.price || payload.pricePerHour || payload.pricePerDay || 0;
  const product = await Product.create({ ...payload, price });
  return product.populate("category");
};

const getProductById = async (id) => {
  const product = await Product.findById(id).populate("category");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const updateProduct = async (id, body, file) => {
  const product = await Product.findByIdAndUpdate(
    id,
    productPayload(body, file),
    { new: true, runValidators: true }
  ).populate("category");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const updateOwnerProduct = async (ownerId, id, body, file) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, owner: ownerId },
    productPayload(body, file),
    { new: true, runValidators: true }
  ).populate("category");

  if (!product) {
    throw new ApiError(404, "Venue not found for this owner");
  }

  return product;
};

const deleteOwnerProduct = async (ownerId, id) => {
  const product = await Product.findOneAndDelete({ _id: id, owner: ownerId });

  if (!product) {
    throw new ApiError(404, "Venue not found for this owner");
  }

  return product;
};

const getOwnerProducts = (ownerId) =>
  Product.find({ owner: ownerId }).populate("category").sort({ createdAt: -1 });

const updateAvailability = async (ownerId, id, metadata) => {
  const product = await Product.findOne({ _id: id, owner: ownerId });

  if (!product) {
    throw new ApiError(404, "Venue not found for this owner");
  }

  product.metadata = {
    ...product.metadata,
    blockedDates: metadata.blockedDates || product.metadata.blockedDates,
    availableDates: metadata.availableDates || product.metadata.availableDates,
    timeSlots: metadata.timeSlots || product.metadata.timeSlots,
  };

  await product.save();
  return product.populate("category");
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const updateStock = async (id, body) => {
  const { stock, action = "set", quantity = 0 } = body;
  const product = await getProductById(id);

  if (action === "increase") {
    product.stock += Number(quantity);
  } else if (action === "reduce") {
    product.stock -= Number(quantity);
  } else {
    product.stock = Number(stock);
  }

  if (Number.isNaN(product.stock) || product.stock < 0) {
    throw new ApiError(400, "Stock must be a non-negative number");
  }

  await product.save();

  return {
    product,
    warning:
      product.stock <= env.lowStockThreshold
        ? `Low stock warning: ${product.stock} units remaining`
        : null,
  };
};

const getInventoryDashboard = async () => {
  const [summary] = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        totalStock: { $sum: "$stock" },
        totalInventoryValue: { $sum: { $multiply: ["$price", "$stock"] } },
        lowStockProducts: {
          $sum: {
            $cond: [{ $lte: ["$stock", env.lowStockThreshold] }, 1, 0],
          },
        },
      },
    },
  ]);

  const lowStock = await Product.find({
    stock: { $lte: env.lowStockThreshold },
  })
    .populate("category")
    .sort({ stock: 1 })
    .limit(10);

  return {
    summary: summary || {
      totalProducts: 0,
      totalStock: 0,
      totalInventoryValue: 0,
      lowStockProducts: 0,
    },
    lowStock,
    lowStockThreshold: env.lowStockThreshold,
  };
};

module.exports = {
  getProducts,
  createProduct,
  createOwnerProduct,
  getProductById,
  updateProduct,
  updateOwnerProduct,
  deleteOwnerProduct,
  getOwnerProducts,
  updateAvailability,
  deleteProduct,
  updateStock,
  getInventoryDashboard,
};
