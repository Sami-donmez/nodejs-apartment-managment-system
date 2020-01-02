/* jshint indent: 2 */
const Sequelize = require("sequelize");
module.exports = sequelize.define('announcement', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(400),
      allowNull: false
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },site_id:{
      type:Sequelize.INTEGER(11),
      allowNull:false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue:Sequelize.NOW
    }
  }, {
    tableName: 'announcement',timestamps: false
  });

