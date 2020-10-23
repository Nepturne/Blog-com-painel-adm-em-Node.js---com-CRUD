const express = require("express");
const router = express.Router();
const User = require("./User.js");
const bcrypt = require("bcryptjs");

// Middleware adminAuth de Autorização a Autenticação
const adminAuth = require("../middlewares/adminAuth.js");

router.get("/admin/users" ,adminAuth, (req,res) => {
  User.findAll().then( (users) => {
    res.render("admin/users/index.ejs" , { users: users });
  });
});

router.get("/admin/users/create" , (req,res) => {
  res.render("admin/users/create.ejs");
});

router.post("/users/create" , (req,res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({where: {email: email }}).then( (user) => {
    if( user == undefined) {

      var salt = bcrypt.genSaltSync(10); // Um plus de segurança ao Hash
      var hash = bcrypt.hashSync(password,salt); // Gerar Hash

      User.create({
        email: email,
        password: hash
      }).then( () => {
        res.redirect("/");
      }).catch( (err) => {
        res.redirect("/");
      });
      
    } else{
      res.redirect("/admin/users/create.ejs");
    }

  });
});

router.get("/login" , (req,res) => {
  res.render("admin/users/login.ejs");
});

router.post("/authenticate" , (req,res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({where: { email: email }}).then( (user) => {
    if( user != undefined) {
      // Validar Senha
      var correct = bcrypt.compareSync(password,user.password);
      if( correct ) {
        req.session.user = {
          id : user.id,
          email: user.email
        }
        res.redirect("/admin/articles");
      }
      else {
        res.redirect("/login");
      }
    }
    
    else{
      res.redirect("/login");
    }

  });

});

router.get("/logout" , (req,res) => {
  req.session.user = undefined;
  res.redirect("/");
});


module.exports = router;

