const Sequelize = require("sequelize");

const connection = new Sequelize("//nomedobanco", "//usuáriodobanco", "//senhadobanco", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
