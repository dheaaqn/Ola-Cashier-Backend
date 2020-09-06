const router = require("express").Router();
const {
  getOrder,
  getOrderById,
  postOrder,
  deleteOrder,
} = require("../controller/OrderController");
const {
  getOrderRedis,
  getOrderByIdRedis,
  clearOrderRedis,
} = require("../middleware/redis");
const { authUser, authAdmin } = require("../middleware/auth");

// GET
router.get("/", authUser, getOrderRedis, getOrder);
router.get("/:id", authUser, getOrderByIdRedis, getOrderById);

// POST
router.post("/", authUser, clearOrderRedis, postOrder);

// DELETE
router.delete("/:id", authAdmin, clearOrderRedis, deleteOrder);
module.exports = router;
