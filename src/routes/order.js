const router = require("express").Router();
const {
  getOrder,
  getOrderById,
  postOrder,
  deleteOrder,
} = require("../controller/OrderController");

const { authUser, authAdmin } = require("../middleware/auth");

// GET
router.get("/", authUser, getOrder);
router.get("/:id", authUser, getOrderById);

// POST
router.post("/", authUser, postOrder);

// DELETE
router.delete("/:id", authAdmin, deleteOrder);
module.exports = router;
