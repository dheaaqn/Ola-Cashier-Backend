const router = require('express').Router()
const { getProduct } = require('../controller/ProductController')

// GET
router.get('/', getProduct)

module.exports = router