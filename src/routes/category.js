const router = require("express").Router();
const {
  getCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/CategoryController");
const { authUser, authAdmin } = require("../middleware/auth");
const {
  getCategoryRedis,
  getCategoryIdRedis,
  clearCategoryRedis,
} = require("../middleware/redis");

// GET
router.get("/", authUser, getCategoryRedis, getCategory);
router.get("/:id", authUser, getCategoryIdRedis, getCategoryById);

// POST
router.post("/", authAdmin, clearCategoryRedis, postCategory);

// PATCH
router.patch("/:id", authAdmin, clearCategoryRedis, patchCategory);

// DELETE
router.delete("/:id", authAdmin, clearCategoryRedis, deleteCategory);

module.exports = router;
