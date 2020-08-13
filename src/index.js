const route = require("express").Router()

const product = require('./routes/product')
const category = require('./routes/category')

route.use('/product', product)
route.use('/category', category)

module.exports = route