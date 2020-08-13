const router = require('express').Router()
const { getCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/CategoryController')

// GET
router.get('/', getCategory)
router.get('/:id', getCategoryById)

// POST
router.post('/', postCategory)

// PATCH
router.patch('/:id', patchCategory)

// DELETE
router.delete('/:id', deleteCategory)

module.exports = router