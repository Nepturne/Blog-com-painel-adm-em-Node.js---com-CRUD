const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database.js");

// Controllers - Da aplicação:
const categoriesController = require("./categories/CategoriesController.js");
const articlesController = require("./articles/ArticlesController.js");
const usersController = require("./users/UsersController.js");

// Models [Represent for Tables] - Da aplicação:
const Article = require("./articles/Article.js");
const Category = require("./categories/Category.js");
const User = require("./users/User.js");

// View Engine
app.set("view engine", "ejs");

// Sessions
app.use(session({
  secret: "qualquercoisa" , cookie: { maxAge: 30000 }
}));

// Static
app.use(express.static("public"));

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão D.B feita com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

// Usar os controllers: Para que possamos usar as rotas definidas nos controllers:
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index.ejs", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != null) {
        Category.findAll().then((categories) => {
          res.render("article.ejs", {
            article: article,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.statusCode = 500;
      res.redirect("/");
    });
});

app.get("/category/:slug" , (req,res) =>{
    var slug = req.params.slug;
    Category.findOne({
      where:{
        slug: slug
      },
      include: [{model: Article}]
    }).then( (category) => {
      if(category!= undefined){
        Category.findAll().then( (categories) => {
          res.render("index.ejs" , { articles: category.articles , categories: categories});
        });
      } else{
        res.redirect("/");
      }
    }).catch( (err) => {
      res.redirect("/");
    });
});

app.listen(4000, (error) => {
  if (error) {
    console.log("O servidor está com algum defeito!");
  } else {
    console.log("O servidor está rodando na porta 4000!");
  }
});
