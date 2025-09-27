const Sequelize = require("sequelize");
const db = require("../database/db.js");

const Car = db.define("Car", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  trade: { type: Sequelize.STRING, allowNull: false },
  model: { type: Sequelize.STRING, allowNull: false },
  year: { type: Sequelize.INTEGER, allowNull: false },
  price: { type: Sequelize.DECIMAL, allowNull: false },
});

module.exports = Car;
