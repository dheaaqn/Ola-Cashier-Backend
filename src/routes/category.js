const router = require("express").Router();
const {
  getCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/CategoryController");

const { authUser } = require("../middleware/auth");

// GET
router.get("/", authUser, getCategory);
router.get("/:id", authUser, getCategoryById);

// POST
router.post("/", postCategory);

// PATCH
router.patch("/:id", patchCategory);

// DELETE
router.delete("/:id", deleteCategory);

module.exports = router;
