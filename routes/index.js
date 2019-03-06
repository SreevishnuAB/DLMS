var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
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
const Models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title: 'DLMS',auth: false});
});
router.post('/login',(req,res,next)=>{
//  res.send(req.body.user);
  sequelize
    .authenticate()
    .then(()=>{
      console.log("Connected");
    }
  )
  .catch(err=>{
    console.log(err);
  });
});

module.exports = router;
