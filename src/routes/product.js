const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const { authUser } = require("../middleware/auth");
// const { getProductByIdRedis } = require("../middleware/redis");
const {
  getProduct,
  getProductById,
  getProductByCategory,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/ProductController");

let upload = multer({ storage: storage });

// GET
router.get("/", authUser, getProduct);
router.get("/:id", authUser, getProductById);
router.get("/bycategory/:id", authUser, getProductByCategory);

// POST
router.post("/", upload.single("product_image"), postProduct);

// PATCH
router.patch("/:id", patchProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;
