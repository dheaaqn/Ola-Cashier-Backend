const route = require("express").Router();

const product = require("./routes/product");
const category = require("./routes/category");
const history = require("./routes/history");
const order = require("./routes/order");
const user = require("./routes/user");

route.use("/product", product);
route.use("/category", category);
route.use("/order", order);
route.use("/history", history);
route.use("/users", user);

module.exports = route;
