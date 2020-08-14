const helper = require('../helper/product.js');
const { getProduct, getProductCount, getProductById, postProduct, patchProduct, deleteProduct, searchProduct, sortProduct } = require('../model/Product')
const qs = require('querystring')

const getPrevPage = (page, currentQuery) => {
    if (page > 1) {
        const generatedpage = {
            page: page - 1
        }
        const resPrevPage = { ...currentQuery, ...generatedpage }
        return qs.stringify(resPrevPage)
    } else {
        return null
    }
}

const getNextPage = (page, totalPage, currentQuery) => {
    if (page < totalPage) {
        const generatedpage = {
            page: page + 1
        }
        const resNextPage = { ...currentQuery, ...generatedpage }
        return qs.stringify(resNextPage)
    } else {
        return null
    }
}

module.exports = {
    getProduct: async (req, res) => {
        let { search, sort, page, limit } = req.query
        page = parseInt(page)
        limit = parseInt(limit)

        let totalData = await getProductCount()

        let totalPage = Math.ceil(totalData / limit)
        let offset = (page * limit) - limit

        let previousPage = getPrevPage(page, req.query)
        let nextPage = getNextPage(page, totalPage, req.query)

        const setPage = {
            page,
            limit,
            totalPage,
            totalData,
            previousPage: previousPage && `http://127.0.0.1:3000/product?${previousPage}`,
            nextPage: nextPage && `http://127.0.0.1:3000/product?${nextPage}`
        }

        try {
            const result = await getProduct(search, sort, limit, offset)
            return helper.response(res, 200, 'Success Get Product', result, setPage)
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }

    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await getProductById(id)
            if (result.length > 0) {
                return helper.response(res, 200, 'Success Get Product by Id', result)
            } else {
                return helper.response(res, 404, `Product id ${id} not found`)
            }
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }
    },
    postProduct: async (req, res) => {
        try {
            const { product_name, product_price, product_status } = req.body
            const setData = {
                product_name,
                product_price,
                product_created_at: new Date(),
                product_status,
            }
            const result = await postProduct(setData)
            return helper.response(res, 201, 'Product Created', result)
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }
    },
    patchProduct: async (req, res) => {
        try {
            const { id } = req.params
            const { product_name, product_price, product_status } = req.body
            const setData = {
                product_name,
                product_price,
                product_updated_at: new Date(),
                product_status
            }
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await patchProduct(setData, id)
                return helper.response(res, 201, 'Product Updated', result)
            } else {
                return helper.response(res, 404, `Product ID ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await deleteProduct(id)
                return helper.response(res, 201, 'Product Deleted', result)
            } else {
                return helper.response(res, 404, `Product ID ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }
    }
}