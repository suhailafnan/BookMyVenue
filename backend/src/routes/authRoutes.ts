import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/authController";
import { protect } from "../middlewares/auth";
import { validateRequestBody } from "../middlewares/validateRequest";

const router = Router();

const registerValidation = validateRequestBody([
  {
    field: "name",
    required: true,
    type: "string",
    validate: (val) => val.trim().length >= 2 || "Name must be at least 2 characters.",
  },
  {
    field: "email",
    required: true,
    type: "string",
    validate: (val) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Please supply a valid email address.",
  },
  {
    field: "password",
    required: true,
    type: "string",
    validate: (val) => val.length >= 6 || "Password must be at least 6 characters.",
  },
  {
    field: "role",
    required: false,
    type: "string",
    validate: (val) => !val || ["user", "admin"].includes(val) || "Role must be user or admin.",
  }
]);

const loginValidation = validateRequestBody([
  {
    field: "email",
    required: true,
    type: "string",
  },
  {
    field: "password",
    required: true,
    type: "string",
  },
]);

// Publicly available auth endpoints
router.post("/register", registerValidation as any, register);
router.post("/login", loginValidation as any, login);

// Protected endpoints (Requires user session JWT token validation)
router.get("/me", protect as any, getCurrentUser as any);

export default router;
