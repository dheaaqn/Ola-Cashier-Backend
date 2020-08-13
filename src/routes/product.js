const router = require('express').Router()
const { getProduct, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/ProductController')

// GET
router.get('/', getProduct)
router.get('/:id', getProductById)

// POST
router.post('/', postProduct)

// PATCH
router.patch('/:id', patchProduct)

// DELETE
router.delete('/:id', deleteProduct)

module.exports = router