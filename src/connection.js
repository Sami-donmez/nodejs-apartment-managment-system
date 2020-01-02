const Sequelize = require("sequelize");

const sequelize = new Sequelize("UVpFJUWpvj", "UVpFJUWpvj", "zfZqzvOjD6", {
  host: "remotemysql.com",
  dialect: "mysql"
});

module.exports = sequelize;
global.sequelize = sequelize;
