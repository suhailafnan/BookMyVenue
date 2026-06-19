const asyncHandler = require("../middleware/asyncHandler");
const productService = require("../services/productService");

const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getProducts(req.query);

  res.success({
    data: result.products,
    meta: {
      pagination: result.pagination,
      inventory: result.inventory,
    },
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req.file);
  res.created({ data: product, message: "Product created successfully" });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.success({ data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body,
    req.file
  );

  res.success({ data: product, message: "Product updated successfully" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.success({ message: "Product deleted successfully" });
});

const updateStock = asyncHandler(async (req, res) => {
  const { product, warning } = await productService.updateStock(
    req.params.id,
    req.body
  );

  res.success({
    data: product,
    message: "Stock updated successfully",
    meta: { warning },
  });
});

const getInventoryDashboard = asyncHandler(async (req, res) => {
  const dashboard = await productService.getInventoryDashboard();
  res.success({ data: dashboard });
});

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getInventoryDashboard,
};
