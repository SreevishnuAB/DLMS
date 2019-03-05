var express = require('express');
var router = express.Router();

//router.use(express.json());
//router.use(express.urlencoded({extended:false}));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title: 'DLMS',auth: false});
});
router.post('/login',(req,res,next)=>{
//  res.send(req.body.user);
});
module.exports = router;
