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

// GET
router.get("/", getAllHistory);
router.get("/dashboard/todaysincome", getTodaysIncome);
router.get("/dashboard/thisyearincome", getThisYearsIncome);
router.get("/dashboard/totalorders", getTotalOrders);
router.get("/dashboard/datachart", getDataChart);
router.get("/dashboard/recentorder", getRecentOrder);
router.get("/:id", getHistoryById);

// DELETE
router.delete("/:id", deleteHistory);

module.exports = router;
