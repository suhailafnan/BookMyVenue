const express = require("express");

const router = express.Router();

const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");


// GET ALL CATEGORIES
router.get("/", getCategories);


// CREATE CATEGORY
router.post("/", createCategory);

module.exports = router;