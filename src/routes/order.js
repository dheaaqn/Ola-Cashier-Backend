const router = require('express').Router()
const { getOrder, getOrderById, postOrder } = require('../controller/OrderController')

// GET
router.get('/', getOrder)
router.get('/:id', getOrderById)

// POST
router.post('/', postOrder)

module.exports = router