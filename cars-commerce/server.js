const express = require('express')
const db = require('./db/db')
const Car = require('./models/car')
const PORT = 3000

const app = express()

app.use(express.json())

db.sync()

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}.`)
})