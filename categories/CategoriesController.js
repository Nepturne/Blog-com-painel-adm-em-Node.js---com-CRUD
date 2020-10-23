const express = require("express");
const router = express.Router();
const Category = require("./Category.js");
//Após instalarmos o slugify com : npm install --save slugify
const slugify = require("slugify");

// Middleware adminAuth de Autorização a Autenticação
const adminAuth = require("../middlewares/adminAuth.js");

// Rota de Front do formulário para cadastrar categorias = GET por que recupera inputs
router.get("/admin/categories/new", adminAuth, (req, res) => {
  res.render("admin/categories/new.ejs");
});

// Rota de cadastro de Categoria = POST por que é cadastro
router.post("/categories/save", adminAuth ,(req, res) => {
  var title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title),
    })
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.redirect("/admin/categories/new.ejs");
  }
});

// Rota de listagem de categorias - front
router.get("/admin/categories", adminAuth ,(req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index.ejs", {
      categories: categories,
    }); // Criaremos o arquivo no diretório
  });
});

// Rota para deletar categorias
router.post("/categories/delete", adminAuth ,(req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    // Se não for undefined
    if (!isNaN(id)) {
      // Se for númerico
      Category.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    } else {
      // Se não for numérico
      res.redirect("/admin/categories");
    }
  } else {
    // Se for Undefined ou Null
    res.redirect("/admin/categories");
  }
});

// Rota para editar categorias
router.get("/admin/categories/edit/:id",adminAuth , (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.redirect("/admin/categories");
  }

  Category.findByPk(id)
    .then((category) => {
      res.render("admin/categories/edit.ejs", { category: category });
    })
    .catch((error) => {
      res.redirect("/admin/categories");
    });
});

// Rota para atualizar categorias
router.post("/categories/update",adminAuth, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  Category.update(
    { title: title, slug: slugify(title) },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});
// Por enquanto sobre categorias é até aqui.
module.exports = router;
