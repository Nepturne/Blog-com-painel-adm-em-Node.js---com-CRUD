const Sequelize = require("sequelize");
const connection = require("../database/database.js");

const User = connection.define('users' , {
  email:{
    type : Sequelize.STRING,
    allowNull: false
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

//User.sync({ force : true }); // Só pra criar a table

module.exports = User;
