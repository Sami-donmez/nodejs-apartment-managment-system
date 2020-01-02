/* jshint indent: 2 */
const Sequelize=require("sequelize");
const user= sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    identify: {
      type: Sequelize.STRING(11),
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER(1),
      allowNull: false
    },
    authorization: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, { // options
    timestamps: false
});

module.exports=user;