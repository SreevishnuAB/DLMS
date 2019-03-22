var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

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
router.get('/', function(req, res, next) {
  res.render('index',{title: 'DLMS',auth: false});
});

router.post('/login',(req,res,next)=>{
//  res.send(req.body.user);
  sequelize
    .authenticate()
    .then(()=>{
//      console.log("Connected");
      sequelize.query(`select password from ${req.body.designation} where id='${req.body.user}'`,{type: sequelize.QueryTypes.SELECT})
        .then(users =>{
//          console.log(users[0]['password']);
//          console.log(req.body.password);
//          if(users[0].password == req.body.password){
//            req.session.user = req.body.user;
//            req.session.user = "The Mask";
          bcrypt.compare(req.body.password,users[0].password,function(err,result){
            console.log(req.body.designation);
            console.log(result);
            if(result==true){
              req.session.user = req.body.user;
              req.session.des = req.body.designation;
              if(req.body.designation == 'students')
                res.redirect('../users/student');
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
    }
  )
  .catch(err=>{
    console.log(err);
  });
});

router.get('/register',(req,res)=>{
  res.render('register');
});

router.post('/register',async (req,res)=>{
//  console.log(req.body);
//  console.log(req.body.id);
//  console.log(req.body.email);
//  console.log(req.body.password);
//  console.log(req.body.designation);
//  res.jsonp({success:true});
  await bcrypt.hash(req.body.password,10,function(err,hash){
//    console.log(hash);
    var query = (req.body.designation == 'students')?
      `insert into ${req.body.designation} values('${req.body.username}','${req.body.dummy}','${hash}','${req.body.email}')`:
      `insert into ${req.body.designation} values('${req.body.username}','${hash}','${req.body.email}','${req.body.dummy}')`;
    sequelize.query(query,{type:Sequelize.QueryTypes.INSERT});
    res.jsonp({success:true});
  });
});

module.exports = router;
