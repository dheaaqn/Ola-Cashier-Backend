const helper = require("../helper/product.js");
const redis = require("redis");
const client = redis.createClient();
const {
  getCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../model/Category");

module.exports = {
  getCategory: async (req, res) => {
    try {
      const result = await getCategory();
      client.set("getcategory", JSON.stringify(result));
      return helper.response(res, 200, "Success Get Category", result);
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getCategoryById(id);
      client.set(`getcategorybyid:${id}`, JSON.stringify(result));
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get Category by Id", result);
      } else {
        return helper.response(res, 404, `Category id ${id} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
  postCategory: async (req, res) => {
    try {
      const { category_name, category_status } = req.body;
      const setData = {
        category_name,
        category_status,
      };
      const result = await postCategory(setData);
      return helper.response(res, 201, "Category Created", result);
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
  patchCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name, category_status } = req.body;
      const setData = {
        category_name,
        category_status,
      };
      const checkId = await getCategoryById(id);
      if (checkId.length > 0) {
        const result = await patchCategory(setData, id);
        return helper.response(res, 201, "Category Updated", result);
      } else {
        return helper.response(res, 404, `Category ID ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await getCategoryById(id);
      if (checkId.length > 0) {
        const result = await deleteCategory(id);
        return helper.response(res, 201, "Category Deleted", result);
      } else {
        return helper.response(res, 404, `Category ID ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
};
