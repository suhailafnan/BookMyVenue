const ApiError = require("../utils/apiError");

const isValidObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(value);

const requireFields = (fields) => (req, res, next) => {
  const missing = fields.filter((field) => {
    const value = req.body[field];
    return value === undefined || value === null || value === "";
  });

  if (missing.length > 0) {
    return next(
      new ApiError(400, `Missing required field(s): ${missing.join(", ")}`)
    );
  }

  next();
};

const validateObjectId = (paramName = "id") => (req, res, next) => {
  if (!isValidObjectId(req.params[paramName])) {
    return next(new ApiError(400, "Invalid resource id"));
  }

  next();
};

const validateProductPayload = (req, res, next) => {
  const numericFields = ["price", "stock"];

  for (const field of numericFields) {
    if (
      req.body[field] !== undefined &&
      (Number.isNaN(Number(req.body[field])) || Number(req.body[field]) < 0)
    ) {
      return next(new ApiError(400, `${field} must be a non-negative number`));
    }
  }

  if (req.body.metadata && typeof req.body.metadata === "string") {
    try {
      JSON.parse(req.body.metadata);
    } catch {
      return next(new ApiError(400, "metadata must be valid JSON"));
    }
  }

  next();
};

const validateStockPayload = (req, res, next) => {
  const { action = "set", stock, quantity } = req.body;
  const allowedActions = ["set", "increase", "reduce"];

  if (!allowedActions.includes(action)) {
    return next(new ApiError(400, "Invalid stock action"));
  }

  const value = action === "set" ? stock : quantity;

  if (value === undefined || Number.isNaN(Number(value)) || Number(value) < 0) {
    return next(new ApiError(400, "Stock value must be a non-negative number"));
  }

  next();
};

module.exports = {
  requireFields,
  validateObjectId,
  validateProductPayload,
  validateStockPayload,
};
