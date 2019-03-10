var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/student', function(req, res, next) {
//  res.send('respond with a resource');
    if(req.session.user == undefined)
        res.send('error');
    else{
        res.render('student',{auth:true});
        console.log(req.session.user);
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.jsonp({success:true});
});

module.exports = router;
