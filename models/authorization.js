/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports = sequelize.define('authorization', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'authorization',
    timestamps: false
  });

