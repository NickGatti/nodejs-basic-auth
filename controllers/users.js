const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  /*
    Users Table:
      id
      name
      email
      age
      password
  */
  index: function(req, res) {
    if(!req.session.error){
      req.session.error = "";
    }
    res.render("index", {error: req.session.error});
  },
  register: function(req, res){
    knex('users').insert({
      name:req.body.name,
      email:req.body.email,
      age:req.body.age,
      password:req.body.password
    }).then(()=>{
      res.redirect('/');
    })
  },
  login: function(req, res){
    knex('users')
      .where('email', req.body.email)
      .then((user)=>{
        user = user[0];
        if(!user){
          req.session.error = "Invalid email/password"
          req.session.save(()=>{
            res.redirect('/');
            return;
          })
        }

        if(user.password === req.body.password){
          req.session.user = user;
          req.session.save(()=>{
            // redirect somewhere
            res.redirect('/protectedpage');
          })
        }else{
          req.session.error = "Invalid email/password"
          req.session.save(()=>{
            res.redirect('/');
          })
        }

      })
  },

  protectedpage: function(req, res){
    res.render('protectedpage', {user: req.session.user})
  }
}
