const helper = require("../helper/product.js");
const redis = require("redis");
const client = redis.createClient();
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
      client.set(`gethistory`, JSON.stringify(result));
      return helper.response(res, 200, "Success Get All History", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getHistoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getHistoryById(id);
      client.set(`gethistorybyid:${id}`, JSON.stringify(result));
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
  getAllIncome: async (req, res) => {
    try {
      const todaysIncome = await getTodaysIncome()
      const totalOrders = await getTotalOrders()
      const thisYearsIncome = await getThisYearIncome()

      const income = {
        todaysIncome: todaysIncome[0].todays_income,
        totalOrders: totalOrders[0].orders,
        thisYearsIncome: thisYearsIncome[0].this_years_income
      }

      return helper.response(res, 201, "Success Get All Income Data", income);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getDataChart: async (req, res) => {
    try {
      const result = await getDataChart();
      return helper.response(res, 200, "Success get data chart", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getRecentOrder: async (req, res) => {
    try {
      const history = await getAllHistory()
      for (i = 0; i < history.length; i++) {
        const order = await getOrderByHistoryId(history[i].history_id)
        history[i].orders = order
      }
      return helper.response(res, 200, "Success Get recent Order", history);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
