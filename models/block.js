/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports = 
  sequelize.define('block', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    site_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(250),
      allowNull: false
    }, address: {
      type: Sequelize.TEXT,
      allowNull: false
    }

  }, {
    tableName: 'block',
    timestamps: false
  });

