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

const { authUser, authAdmin } = require("../middleware/auth");

// GET
router.get("/", authUser, getAllHistory);
router.get("/dashboard/todaysincome", authUser, getTodaysIncome);
router.get("/dashboard/thisyearincome", authUser, getThisYearsIncome);
router.get("/dashboard/totalorders", authUser, getTotalOrders);
router.get("/dashboard/datachart", authUser, getDataChart);
router.get("/dashboard/recentorder", authUser, getRecentOrder);
router.get("/:id", authUser, getHistoryById);

// DELETE
router.delete("/:id", authAdmin, deleteHistory);

module.exports = router;
