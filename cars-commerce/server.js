const express = require('express')
const db = require('./db/db')
const carsRoutes = require('./routes/carsRoutes')
const PORT = 3000

const app = express()

app.use(express.json())

db.sync()

app.use('', carsRoutes)

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}.`)
})