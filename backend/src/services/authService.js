const User = require("../models/User");
const ApiError = require("../utils/apiError");
const { signToken } = require("../utils/jwt");

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  savedVenues: user.savedVenues,
});

const register = async (payload) => {
  const existing = await User.findOne({ email: payload.email });

  if (existing) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    phone: payload.phone,
    role: payload.role || "customer",
  });

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
};

module.exports = {
  register,
  login,
  sanitizeUser,
};
