const Sequelize = require("sequelize");
const connection = require("../database/database.js");
const Category = require("../categories/Category.js");
// Definição da Tabela
const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
// Definição dos Relacionamentos
Category.hasMany(Article);
Article.belongsTo(Category);

// Criação da TB de acordo com a Definição da Tabela no Model com:
//Article.sync({ force: true });

module.exports = Article;
