function adminAuth(req,res,next){
  
  if(req.session.user != undefined){
    next(); // Continue a requisição
  }else{
    res.redirect("/login");
  }

}

module.exports = adminAuth;
