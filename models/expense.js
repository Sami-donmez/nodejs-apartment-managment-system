/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports = sequelize.define('expense', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cat_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    amount: {
      type: "DOUBLE",
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue:Sequelize.NOW
    },
    statement: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    source: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    site_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    bank_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'expense'
  });
