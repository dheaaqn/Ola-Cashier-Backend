module.exports = {
    response: (response, data, status, message, pagination) => {
        const result = {}
        result.status = status || 200
        result.message = message
        result.pagination = pagination
        result.data = data

        return response.status(result.status).json(result)
    }
}