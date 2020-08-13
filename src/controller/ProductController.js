const helper = require('../helper/product.js');
const { getProduct, getProductById, postProduct, patchProduct, deleteProduct } = require('../model/Product')

module.exports = {
    getProduct: async (req, res) => {
        try {
            const result = await getProduct()
            return helper.response(res, 200, 'Success Get Product', result)
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