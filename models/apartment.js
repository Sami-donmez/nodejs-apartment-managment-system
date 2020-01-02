/* jshint indent: 2 */
const Sequelize = require("sequelize");
module.exports =  sequelize.define('apartment', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
   
    block_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER(1),
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },owner_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'apartment',
    timestamps: false
  });

