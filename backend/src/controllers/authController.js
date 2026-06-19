const asyncHandler = require("../middleware/asyncHandler");
const authService = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.created({ data: result, message: "Registration successful" });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.success({ data: result, message: "Login successful" });
});

const logout = asyncHandler(async (req, res) => {
  res.success({ message: "Logout successful" });
});

const me = asyncHandler(async (req, res) => {
  res.success({ data: req.user });
});

module.exports = {
  register,
  login,
  logout,
  me,
};
