const router = require('express').Router()
const { getOrder, getOrderById, postOrder, deleteOrder } = require('../controller/OrderController')

// GET
router.get('/', getOrder)
router.get('/:id', getOrderById)

// POST
router.post('/', postOrder)

// DELETE
router.delete('/:id', deleteOrder)
module.exports = router