const route = require("express").Router()

const product = require('./routes/product')

route.use('/product', product)

module.exports = route