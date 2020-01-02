/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports = sequelize.define('expense', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    branch_no: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    account_no: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    ,
    branch_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    iban: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    site_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'bank'
  });
