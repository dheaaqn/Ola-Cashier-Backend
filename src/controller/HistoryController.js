const helper = require('../helper/product.js');
const { getAllHistory, getHistoryById } = require('../model/History')

module.exports = {
    getAllHistory: async (req, res) => {
        try {
            const result = await getAllHistory()
            return helper.response(res, 200, 'Success Get All History', result)
        } catch (error) {
            return helper.response(res, 400, 'Bad Request')
        }
    },
    getHistoryById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await getHistoryById(id)
            if (result.length > 0) {
                return helper.response(res, 200, 'Success Get History by Id', result)
            } else {
                return helper.response(res, 404, `History id ${id} not found`)
            }
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }
    },
    postHistory: async (req, res) => {
        try {
            const { id } = req.params
            const historyData = await getHistoryById(id)
        } catch (error) {
            return helper.response(res, 400, 'Bad Request')
        }
    }
}