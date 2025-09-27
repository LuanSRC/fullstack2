const Sequelize = require("sequelize");
const db = require("../database/db.js");

const User = db.define("User", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.STRING, allowNull: false, defaultValue: "user" },
});

module.exports = User;
