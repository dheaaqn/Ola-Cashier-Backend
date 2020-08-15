const router = require('express').Router()
const { } = require('../controller/HistoryController')
const { getAllHistory, getHistoryById } = require('../model/History')

// GET
router.get('/', getAllHistory)
router.get('/id', getHistoryById)

// POST

module.exports = router