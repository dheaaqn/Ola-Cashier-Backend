const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  deleteHistory,
  getTodaysIncome,
  getThisYearsIncome,
  getTotalOrders,
} = require("../controller/HistoryController");

// GET
router.get("/", getAllHistory);
router.get("/todaysincome", getTodaysIncome);
router.get("/thisyearincome", getThisYearsIncome);
router.get("/totalorders", getTotalOrders);
router.get("/:id", getHistoryById);

// DELETE
router.delete("/:id", deleteHistory);

module.exports = router;
