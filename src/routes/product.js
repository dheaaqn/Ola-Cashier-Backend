const router = require("express").Router();

const { authUser, authAdmin } = require("../middleware/auth");
const uploadImage = require("../middleware/multer");

// const { getProductByIdRedis } = require("../middleware/redis");
const {
  getProduct,
  getProductById,
  getProductByCategory,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/ProductController");

// GET
router.get("/", authUser, getProduct);
router.get("/:id", authUser, getProductById);
router.get("/bycategory/:id", authUser, getProductByCategory);

// POST
router.post("/", authAdmin, uploadImage, postProduct);

// PATCH
router.patch("/:id", authAdmin, uploadImage, patchProduct);

// DELETE
router.delete("/:id", authAdmin, deleteProduct);

module.exports = router;
