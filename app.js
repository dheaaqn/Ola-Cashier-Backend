const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const routerNavigation = require('./src/index');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.use('/', routerNavigation)

app.get('*', (req, res) => {
    res.status(404).send('Path not found')
})

app.listen(3000, "127.0.0.1", () => {
    console.log("ExpressJS running on port 3000")
})