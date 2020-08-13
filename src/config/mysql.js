const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'online-shop'
})

connection.connect(error => {
    if (error) {
        throw error
    }
    console.log('Database Connected')
})

module.exports = connection