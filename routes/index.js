var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register',(req,res,next)=>{
  res.send("Registration");
});
module.exports = router;
