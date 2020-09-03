const helper = require("../helper/product.js");
const {
  getAllHistory,
  getHistoryById,
  deleteHistory,
  getTodaysIncome,
  getThisYearIncome,
  getTotalOrders,
} = require("../model/History");

module.exports = {
  getAllHistory: async (req, res) => {
    try {
      const result = await getAllHistory();
      return helper.response(res, 200, "Success Get All History", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getHistoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getHistoryById(id);
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get History by Id", result);
      } else {
        return helper.response(res, 404, `History id ${id} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
  deleteHistory: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await getHistoryById(id);
      if (checkId.length > 0) {
        const result = await deleteHistory(id);
        return helper.response(res, 201, "History Data Deleted", result);
      } else {
        return helper.response(res, 404, `History ID ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
  getTodaysIncome: async (req, res) => {
    try {
      const result = await getTodaysIncome();
      if (result.todays_income) {
        return helper.response(res, 200, "Success Get Today Income", result);
      } else {
        return helper.response(res, 404, "0 bro");
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getThisYearsIncome: async (req, res) => {
    try {
      const { year } = req.query;
      const result = await getThisYearIncome(year);
      return helper.response(res, 200, "Success Get This Year Income", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getTotalOrders: async (req, res) => {
    try {
      const { perweek } = req.query;
      const result = await getTotalOrders(perweek);
      return helper.response(res, 200, "Success get Orders", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
};
