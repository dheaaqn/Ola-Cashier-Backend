const router = require("express").Router();
const {
  getCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/CategoryController");

const { authUser, authAdmin } = require("../middleware/auth");

// GET
router.get("/", authUser, getCategory);
router.get("/:id", authUser, getCategoryById);

// POST
router.post("/", authAdmin, postCategory);

// PATCH
router.patch("/:id", authAdmin, patchCategory);

// DELETE
router.delete("/:id", authAdmin, deleteCategory);

module.exports = router;
