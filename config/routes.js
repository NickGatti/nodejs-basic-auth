//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
module.exports = function(app){
// HI GUYS
  app.get('/', users.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.use(authMiddleware);
  app.get('/protectedpage', users.protectedpage);
}


function authMiddleware(req, res, next){
  if(!req.session.user){
    res.redirect('/')
  }else{
    next();
  }
}
