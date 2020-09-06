const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/product");

module.exports = {
  getProductRedis: (req, res, next) => {
    client.get(`getproduct:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get Data",
          JSON.parse(result).result,
          JSON.parse(result).setPage
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  getProductByIdRedis: (req, res, next) => {
    const { id } = req.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get Product by ID",
          JSON.parse(result)
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  clearProductRedis: (req, res, next) => {
    client.keys("getproduct*", (error, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  getCategoryRedis: (req, res, next) => {
    client.get(`getcategory`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get Category",
          JSON.parse(result)
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  getCategoryIdRedis: (req, res, next) => {
    const { id } = req.params;
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get Category by ID",
          JSON.parse(result)
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  clearCategoryRedis: (req, res, next) => {
    client.keys("getcategory*", (error, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  getOrderRedis: (req, res, next) => {
    client.get(`getorder`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get Order",
          JSON.parse(result)
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  getOrderByIdRedis: (req, res, next) => {
    const { id } = req.params;
    client.get(`getorderbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get Order by ID",
          JSON.parse(result)
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  clearOrderRedis: (req, res, next) => {
    client.keys("getorder*", (error, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  getHistoryRedis: (req, res, next) => {
    client.get(`gethistory`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get History",
          JSON.parse(result)
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  getHistoryByIdRedis: (req, res, next) => {
    const { id } = req.params;
    client.get(`gethistorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada dalam redis");
        return helper.response(
          res,
          200,
          "Success Get History by ID",
          JSON.parse(result)
        );
      } else {
        console.log("data ngga ada");
        next();
      }
    });
  },
  clearHistoryRedis: (req, res, next) => {
    client.keys("gethistory*", (error, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
};
