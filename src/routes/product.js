const { getProduct } = require('../model/Product')

const router = require('express').Router()
const product = require('../controller/ProductController')

// GET
router.get('/', product.getProduct)

router.post('/', product.postProduct)

router.patch('/:id', product.patchProduct)

router.delete('/:id', product.deleteProduct)

module.exports = router