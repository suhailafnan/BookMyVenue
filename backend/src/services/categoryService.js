const Category = require("../models/Category");
const Product = require("../models/Product");
const ApiError = require("../utils/apiError");

const pickCategoryFields = (body) => ({
  name: body.name,
  description: body.description,
  image: body.image,
});

const getCategories = () => Category.find().sort({ name: 1 });

const createCategory = (body) => Category.create(pickCategoryFields(body));

const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

const updateCategory = async (id, body) => {
  const category = await Category.findByIdAndUpdate(
    id,
    pickCategoryFields(body),
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

const deleteCategory = async (id) => {
  const productsInCategory = await Product.countDocuments({ category: id });

  if (productsInCategory > 0) {
    throw new ApiError(409, "Delete products in this category before removing it");
  }

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
