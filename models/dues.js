/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports =  sequelize.define('dues', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    month: {
      type: Sequelize.INTEGER(4),
      allowNull: false
    },
    year: {
      type: Sequelize.INTEGER(2),
      allowNull: false
    },
    amount: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue:Sequelize.NOW
    },
    site_id: {
     type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'dues'
  });
