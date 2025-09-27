const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database/database.db",
});

sequelize.authenticate();

module.exports = sequelize;
