const asyncHandler = require("../middleware/asyncHandler");
const categoryService = require("../services/categoryService");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();
  res.success({ data: categories });
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.created({ data: category, message: "Category created successfully" });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.success({ data: category });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  res.success({ data: category, message: "Category updated successfully" });
});

const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.success({ message: "Category deleted successfully" });
});

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
