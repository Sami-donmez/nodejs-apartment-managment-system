/* jshint indent: 2 */
const Sequelize=require("sequelize");
module.exports =sequelize.define('feedback', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(400),
      allowNull: false
    },
    cat_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
  }, {imestamps: false,
        tableName: 'feedback'
  });