const connection = require('../config/mysql')

module.exports = {
    getAllHistory: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM history`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getHistoryById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM history WHERE history_id ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postHistory: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO history SET  ?`, setData, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    patchHistory: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE history SET ? WHERE history_id = ?`, [setData, id], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}