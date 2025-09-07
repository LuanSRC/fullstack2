const Sequelize = require('sequelize')
const db = require('../db/db')

const Car = db.define('car', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    manufacturer:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    model:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    transmition:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false,
    }
})

module.exports = Car