const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "//usuáriodobanco", "//senhadobanco", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
