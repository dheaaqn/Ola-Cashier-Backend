const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  deleteHistory,
  getTodaysIncome,
  getThisYearsIncome,
  getTotalOrders,
  getDataChart,
  getRecentOrder,
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
router.get("/dashboard/todaysincome", authUser, getTodaysIncome);
router.get("/dashboard/thisyearincome", authUser, getThisYearsIncome);
router.get("/dashboard/totalorders", authUser, getTotalOrders);
router.get("/dashboard/datachart", authUser, getDataChart);
router.get("/dashboard/recentorder", authUser, getRecentOrder);

// DELETE
router.delete("/:id", authAdmin, clearHistoryRedis, deleteHistory);

module.exports = router;
