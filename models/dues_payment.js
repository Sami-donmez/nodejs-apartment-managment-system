/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports =  sequelize.define('dues', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },user_id: {
     type: Sequelize.INTEGER(11),
      allowNull: false
    },bank_id: {
        type: Sequelize.INTEGER(11),
         allowNull: false
       },
       dues_id: {
        type: Sequelize.INTEGER(11),
         allowNull: false
       },date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue:Sequelize.NOW
      }
  }, {
    timestamps: false,
    tableName: 'dues_payment'
  });
