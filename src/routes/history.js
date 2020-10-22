const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  deleteHistory,
  getDataChart,
  getRecentOrder,
  getAllIncome
} = require("../controller/HistoryController");
const {
  getHistoryRedis,
  getHistoryByIdRedis,
  clearHistoryRedis,
} = require("../middleware/redis");
const { authUser, authAdmin } = require("../middleware/auth");

// GET
router.get("/", authUser, getHistoryRedis, getAllHistory);
router.get("/:id", authUser, getHistoryByIdRedis, getHistoryById);
router.get('/dashboard/all', getAllIncome);
router.get("/dashboard/datachart", authUser, getDataChart);
router.get("/dashboard/recentorder", authUser, getRecentOrder);

// DELETE
router.delete("/:id", authAdmin, clearHistoryRedis, deleteHistory);

module.exports = router;
