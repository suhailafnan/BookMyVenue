const express = require("express");
const {
  login,
  logout,
  me,
  register,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { requireFields } = require("../middleware/validateMiddleware");

const router = express.Router();

router.post("/register", requireFields(["name", "email", "password"]), register);
router.post("/login", requireFields(["email", "password"]), login);
router.post("/logout", protect, logout);
router.get("/me", protect, me);

module.exports = router;
