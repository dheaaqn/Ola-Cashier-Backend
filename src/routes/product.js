const router = require("express").Router();
const { authUser, authAdmin } = require("../middleware/auth");
const uploadImage = require("../middleware/multer");
const {
  getProductRedis,
  getProductByIdRedis,
  clearProductRedis,
} = require("../middleware/redis");
const {
  getProduct,
  getProductById,
  getProductByCategory,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/ProductController");

// GET
router.get("/", authUser, getProductRedis, getProduct);
router.get("/:id", authUser, getProductByIdRedis, getProductById);
router.get("/bycategory/:id", authUser, getProductByCategory);

// POST
router.post("/", authAdmin, clearProductRedis, uploadImage, postProduct);

// PATCH
router.patch("/:id", authAdmin, clearProductRedis, uploadImage, patchProduct);

// DELETE
router.delete("/:id", authAdmin, clearProductRedis, deleteProduct);

module.exports = router;
