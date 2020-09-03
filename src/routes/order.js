const router = require("express").Router();
const {
  getOrder,
  getOrderById,
  postOrder,
  deleteOrder,
} = require("../controller/OrderController");

const { authUser } = require("../middleware/auth");

// GET
router.get("/", authUser, getOrder);
router.get("/:id", authUser, getOrderById);

// POST
router.post("/", authUser, postOrder);

// DELETE
router.delete("/:id", deleteOrder);
module.exports = router;
