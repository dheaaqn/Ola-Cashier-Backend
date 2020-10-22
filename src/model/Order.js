const connection = require("../config/mysql")

module.exports = {
    getOrder: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM orders`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOrderById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM orders WHERE order_id = ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOrderByHistoryId: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT orders.product_id, orders.order_qty, product.product_name, product.product_price FROM orders INNER JOIN product ON orders.product_id = product.product_id WHERE history_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postOrder: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO orders SET ?`, setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        category_id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteOrder: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM orders WHERE order_id = ?`, id, (error, result) => {
                if (!error) {
                    const newResult = { id: id }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}