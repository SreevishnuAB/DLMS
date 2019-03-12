var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/student', function(req, res, next) {
//  res.send('respond with a resource');
    if(req.session.user == undefined)
        res.send('error');
    else{
        var user = req.session.user;
        res.render('student',{auth:true,title:`${user.toUpperCase()} - DLMS`});
        console.log(req.session.user);
    }
});

router.post('/student',(req,res)=>{
    sequelize.query(`insert into dutyleave values('${req.body.id}','${req.body.prog}','${req.body.yoj}','${req.body.batch}','${req.body.sem}','${req.body.event}','${req.body.from}','${req.body.to}')`,{type:Sequelize.QueryTypes.INSERT});
    res.jsonp({success:true});
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.jsonp({success:true});
});

module.exports = router;
