const connection = require('../config/mysql')

module.exports = {
    getProduct: (search, sort, limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT product.product_name, category.category_name, product.product_price, product_created_at, product_updated_at, product.product_status FROM product INNER JOIN category ON product.category_id = category.category_id WHERE product_name LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`, [`%${search}%`, limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductCount: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM product`, (error, result) => {
                !error ? resolve(result[0].total) : reject(new Error(error))
            })
        })
    },
    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE product_id = ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postProduct: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO product SET  ?`, setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    patchProduct: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE product SET ? WHERE product_id = ?`, [setData, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM product WHERE product_id = ?`, id, (error, result) => {
                if (!error) {
                    const newResult = { id: id }
                    resolve(newResult)
                }
                else {
                    reject(new Error(error))
                }
            })
        })
    }
}