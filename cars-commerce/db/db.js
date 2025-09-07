const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
})

sequelize.authenticate()

module.exports = sequelize