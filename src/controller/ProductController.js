const helper = require('../helper/product.js');
const { getProduct } = require('../model/Product')

module.exports = {
    getProduct: async (req, res) => {
        try {
            const result = await getProduct()
            return helper.response(res, 200, 'Success Get Product', result)
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }
    }
}