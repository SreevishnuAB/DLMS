var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/student', function(req, res, next) {
//  res.send('respond with a resource');
res.render('student',{auth:true});
});

module.exports = router;
