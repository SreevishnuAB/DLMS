var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title: 'DLMS',auth: false});
});
router.post('/login',(req,res,next)=>{
  res.send(req.body.user);
  console.log(req.body.user);
});
module.exports = router;
