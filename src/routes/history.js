const router = require('express').Router()
const { getAllHistory, getHistoryById, deleteHistory } = require('../controller/HistoryController')

// GET
router.get('/', getAllHistory)
router.get('/:id', getHistoryById)

// DELETE
router.delete('/:id', deleteHistory)

module.exports = router