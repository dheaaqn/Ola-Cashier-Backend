const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'online_shop'
})

connection.connect(error => {
    if (error) {
        throw error
    }
    console.log('Database Connected')
})

module.exports = connection