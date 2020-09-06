const helper = require("../helper/product.js");
const redis = require("redis");
const client = redis.createClient();
const {
  getOrder,
  getOrderById,
  deleteOrder,
  postOrder,
  getOrderByHistoryId,
} = require("../model/Order");
const {
  postHistory,
  patchHistory,
  getHistoryById,
} = require("../model/History");
const { getProductById } = require("../model/Product");

module.exports = {
  getOrder: async (req, res) => {
    try {
      const result = await getOrder();
      client.set(`getorder`, JSON.stringify(result));
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get Order", result);
      } else {
        return helper.response(res, 404, `Order not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getOrderById(id);
      client.set(`getorderbyid:${id}`, JSON.stringify(result));
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get Order by Id", result);
      } else {
        return helper.response(res, 404, `Order id ${id} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad request");
    }
  },
  postOrder: async (req, res) => {
    const setHistoryData = {
      history_invoice: Math.floor(Math.random() * 110000000),
      history_subtotal: 0,
      history_created_at: new Date(),
    };
    const resultHistory = await postHistory(setHistoryData);
    console.log(resultHistory);

    const historyId = resultHistory.insertId;
    const dataOrder = req.body.order;
    let historySubtotal = 0;

    for (let i = 0; i < dataOrder.length; i++) {
      const productId = dataOrder[i].product_id;
      const orderQty = dataOrder[i].order_qty;

      const product = await getProductById(productId);
      const productData = product[0];

      if (!productData) {
        return helper.response(res, 404, "not found");
      } else {
        const productPrice = productData.product_price;
        const setOrderData = {
          history_id: historyId,
          product_id: productId,
          order_qty: orderQty,
          order_price: orderQty * productPrice,
        };
        const resultOrder = await postOrder(setOrderData);
        historySubtotal += resultOrder.order_price;
      }
    }

    const ppn = historySubtotal * 0.1;
    const subtotal = historySubtotal + ppn;
    const setPatchData = { history_subtotal: subtotal };
    await patchHistory(setPatchData, historyId);

    const historyData = await getHistoryById(historyId);
    const orderData = await getOrderByHistoryId(historyId);

    const result = {
      history_id: historyData[0].history_id,
      history_invoice: historyData[0].history_invoice,
      orders: orderData,
      ppn,
      history_subtotal: historyData[0].history_subtotal,
      history_created_at: historyData[0].history_created_at,
    };

    try {
      return helper.response(res, 200, `Success Post Order`, result);
    } catch (error) {
      return helper.responce(res, 400, `Bad Request`);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await getOrderById(id);
      if (checkId.length > 0) {
        const result = await deleteOrder(id);
        return helper.response(res, 201, "Order Data Deleted", result);
      } else {
        return helper.response(res, 404, `Order ID ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
};
