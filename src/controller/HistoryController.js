const helper = require("../helper/product.js");
const {
  getAllHistory,
  getHistoryById,
  deleteHistory,
  getTodaysIncome,
  getThisYearIncome,
  getTotalOrders,
  getDataChart,
  getRecentOrder,
} = require("../model/History");

const { getOrderByHistoryId } = require("../model/Order");

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
      console.log(result);
      if (result[0].todays_income) {
        return helper.response(res, 200, "Success Get Today Income", result);
      } else {
        return helper.response(res, 404, "There's no income today");
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
      if (result[0].orders) {
        return helper.response(res, 200, "Success get Orders", result);
      } else {
        return helper.response(res, 404, "No one orders this week");
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getDataChart: async (req, res) => {
    try {
      const { date } = req.query;
      const result = await getDataChart(date);
      return helper.response(res, 200, "Success get data chart", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getRecentOrder: async (req, res) => {
    try {
      const result = await getRecentOrder();
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistoryId(result[i].history_id);
        let total = 0;
        result[i].orders.forEach((value) => {
          total += value.order_price;
        });
        const tax = (total * 10) / 100;
        result[i].tax = tax;
      }
      return helper.response(res, 200, "Success Get recent Order", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
