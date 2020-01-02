/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports = sequelize.define('sites', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(250),
      allowNull: false
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'sites',
    timestamps: false
  });

