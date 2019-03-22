var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://qrlwmsdtnnltzr:72fd6b12362abaca65b66c6462f40ed2794b5b537c9ce252e0ec063966b7670f@ec2-54-217-208-105.eu-west-1.compute.amazonaws.com:5432/d5k10ha5d9cd1t',{
    dialect:'postgres',
    dialectOptions:{
      ssl: true
    }
});

/* GET users listing. */
router.get('/student', function(req, res, next) {
//  res.send('respond with a resource');
    if(req.session.user == undefined){
        res.redirect('../');
    }
    else{
        var user = req.session.user;
        res.render('student',{auth:true,title:`${user.toUpperCase()} - DLMS`});
        console.log(req.session.user);
    }
});

router.post('/student',async (req,res)=>{
    console.log(req.body);
    await sequelize.query(`insert into dutyleaves values('${req.body.id}','${req.body.prog}','${req.body.yoj}','${req.body.batch}','${req.body.sem}','${req.body.event}','${req.body.from}','${req.body.to}')`,{type:Sequelize.QueryTypes.INSERT})
        .then(()=>{
            res.jsonp({success:true});      
    });
//    res.jsonp({success:true});
});

router.get('/student/leaves',async (req,res)=>{
  var user = req.session.user;
  await sequelize.query(`select * from dutyleaves where id='${req.session.user}'`,{type: sequelize.QueryTypes.SELECT})
    .then(leaves=>{
        console.log(leaves);
      res.render('studleaves',{auth:true,title:`${user.toUpperCase()} - Duty Leaves - DLMS`,leaves:leaves});
    });
});

router.get('/faculty',async (req,res)=>{
    var user = req.session.user;
    await sequelize.query(`select * from dutyleaves where programme=(select programme from faculties where id='${req.session.user}')`,{type: sequelize.QueryTypes.SELECT})
    .then(leaves=>{
        console.log(leaves);
        
        res.render('faculty',{auth:true,title:`${user.toUpperCase()} - Duty Leaves - DLMS`,leaves:leaves});
    })
    .catch(err=>{
        res.send(`Sorry, something went wrong: ${err}`);
    });
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.jsonp({success:true});
});

module.exports = router;
