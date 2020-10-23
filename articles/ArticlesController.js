const express = require("express");
const router = express.Router();
const Category = require("../categories/Category.js");
const Article = require("../articles/Article.js");
const slugify = require("slugify");

// Middleware adminAuth de Autorização a Autenticação
const adminAuth = require("../middlewares/adminAuth.js");

// Diferença em vez de usar app,usamos router!
router.get("/admin/articles", adminAuth, (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render("admin/articles/index.ejs", { articles: articles });
  });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new.ejs", { categories: categories });
  });
});

router.post("/articles/save", adminAuth, (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;
  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/delete", adminAuth , (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      // SE NÂO FOR UM NÚMERO
      res.redirect("/admin/articles");
    }
  } else {
    // NULL
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id" , adminAuth , (req,res) => {
  var id = req.params.id;
  Article.findByPk(id).then( (article) => {
    if( article != undefined) {
      Category.findAll().then( (categories) => {
        res.render("admin/articles/edit.ejs" , { categories: categories , article: article });
      }); 
    } else {
      res.redirect("/");
    }
  }).catch( (err) => {
    res.redirect("/");
  });

});

router.post("/articles/update" , adminAuth , (req,res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.update({ title : title , body: body , categoryId: category , slug: slugify(title) } , {
    where:{
      id: id
    }
  }).then( () => {
    res.redirect("/admin/articles");
  }).catch( (err) => {  
    res.redirect("/");
  });
});

// Rota de Paginação:
router.get("/articles/page/:num" , (req,res) => {
  var page = req.params.num;
  var offset = 0;

  if(offset == 1 || isNaN(offset) == true){
    offset = 0;
  } else{
    offset = parseInt(page - 1) * 4;
  }

  Article.findAndCountAll({
    limit: 4,
    offset: offset,
    order: [ ['id','DESC'] ]
  }).then( (articles) => {

    var next;
    if(offset + 4 >= articles.count){
      next = false;
    } else{
      next = true;
    }

    var result = {
      page: parseInt(page),
      next: next,
      articles: articles
    };

    Category.findAll().then( (categories) => {
      res.render("admin/articles/page.ejs" , { result: result , categories: categories });
    });

  });

});

module.exports = router;
