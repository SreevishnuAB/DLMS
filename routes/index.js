var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var desSetter = require('../middleware/fetchbatch');
var dateGetter = require('../middleware/date');

/*var sequelize = new Sequelize('d5k10ha5d9cd1t','qrlwmsdtnnltzr','72fd6b12362abaca65b66c6462f40ed2794b5b537c9ce252e0ec063966b7670f',{
  host:'ec2-54-217-208-105.eu-west-1.compute.amazonaws.com',
  dialect: 'postgres',
  dialectOptions:{
    ssl: true
  }
});*/
var sequelize = new Sequelize('postgres://qrlwmsdtnnltzr:72fd6b12362abaca65b66c6462f40ed2794b5b537c9ce252e0ec063966b7670f@ec2-54-217-208-105.eu-west-1.compute.amazonaws.com:5432/d5k10ha5d9cd1t',{
  dialect:'postgres',
  dialectOptions:{
    ssl: true
  }
});

const student = sequelize.define('student',{
  stud_name: Sequelize.STRING,
  stud_id: Sequelize.STRING(14),
  password: Sequelize.STRING,
  batch: Sequelize.STRING,
  email: Sequelize.STRING
});


/* GET home page. */
router.get('/',dateGetter, async function(req, res) {
  console.log(req.session.date);
  await sequelize.query("select programme,year from programmes where programme!='admin' order by programme,year asc",{type: sequelize.QueryTypes.SELECT})
    .then(prog =>{
      console.log(prog);
      res.render('index',{state:false,fac:false,title: 'DLMS',header:'DLMS',prog:prog})
    });
});

router.post('/login',desSetter,async (req,res,next)=>{
  console.log(res.locals.designation);
  var user = req.body.user;
  user = user.toLowerCase();
   await  sequelize.query(`select password from ${res.locals.designation} where id='${user}'`,{type: sequelize.QueryTypes.SELECT})
    .then(users =>{
      bcrypt.compare(req.body.password,users[0].password,function(err,result){
        console.log(result);
        if(result==true){
          req.session.user = user;
          if(res.locals.designation == 'students'){
            req.session.prog = res.locals.prog;
            req.session.year = res.locals.year;
            req.session.sem = res.locals.sem;
            req.session.designation = res.locals.designation;
            console.log(req.session);
            res.redirect('../users/student');
          }
          else if(user == 'admin')
            res.redirect('../users/admin');
          else
            res.redirect('../users/faculty');
          }
        else
          res.send("Invalid credentials");
        });
      })
    .catch(err=>{
      res.send(`Something went Wrong : ${err}`);
      });
    });

router.post('/register',desSetter,async (req,res)=>{
//  console.log(req.body);
//  console.log(req.body.id);
//  console.log(req.body.email);
//  console.log(req.body.password);
//  console.log(req.body.designation);
//  res.jsonp({success:true});

  console.log(res.locals.designation);
  
  await bcrypt.hash(req.body.password,10,function(err,hash){
//    console.log(hash);
    var query = (res.locals.designation == 'students')?(
      `insert into ${res.locals.designation} values('${req.body.username}','${req.body.dummy}','${hash}','${req.body.email}','${res.locals.prog}','${res.locals.year}')`):
      `insert into ${res.locals.designation} values('${req.body.username}','${hash}','${req.body.email}','${(req.body.dummy).substring(5)}','${(req.body.dummy).substring(0,4)}')`;
    sequelize.query(query,{type:Sequelize.QueryTypes.INSERT})
    .then((result)=>{
      console.log(`Then: ${result}`);
      res.json({success:'Account Created'});
    })
    .catch(err=>{
      res.status(500).json({error:err});
      console.log(`Catch: ${err}`);
    });
//    res.jsonp({success:true});
  });
});

module.exports = router;
