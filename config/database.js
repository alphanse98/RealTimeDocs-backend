const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("documents", "devroot", "dev123", {
  host: "localhost:3306",
  dialect: "mysql",
});

module.exports = sequelize;
