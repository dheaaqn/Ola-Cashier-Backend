// const redis = require("redis");
// const client = redis.createClient();
// const helper = require("../helper/product");

// module.exports = {
//   getProductByIdRedis: (req, res, next) => {
//     const { id } = req.params;
//     client.get(`getproductbyid:${id}`, (error, result) => {
//       if (!error && result != null) {
//         console.log("data ada dalam redis");
//         return helper.response(res, 200, JSON.parse(result));
//       } else {
//         console.log("data ngga ada");
//         next();
//       }
//     });
//   },
//   clearDataRedis: (req, res, next) => {},
// };
