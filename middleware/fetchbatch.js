var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://qrlwmsdtnnltzr:72fd6b12362abaca65b66c6462f40ed2794b5b537c9ce252e0ec063966b7670f@ec2-54-217-208-105.eu-west-1.compute.amazonaws.com:5432/d5k10ha5d9cd1t',{
  dialect:'postgres',
  dialectOptions:{
    ssl: true
  }
});

desSetter = async (req,res,next)=>{
  console.log("Data"+req.body.dummy);
  
  var user = (req.body.dummy)?req.body.dummy:req.body.user;
  var prog = user.substring(4,user.length-3);
  var year = `20${prog.substring(prog.length-2)}`;
  prog = prog.substring(0,prog.length-2)
  user = user.substring(user.length-5);
  console.log(user);
  console.log(`${prog} ${year}`);

  var designation = 'faculties';
  if(user.match(/[0-9]/)){
    designation = 'students';
    await sequelize.query(`select programme from programmes where prog_code='${prog}'`,{type:Sequelize.QueryTypes.SELECT})
      .then(result=>{
        res.locals.prog = result[0]['programme'];
        res.locals.year = year;
        console.log(prog);
      })
      .catch(err=>{
        console.log(err);
      });
    }
    res.locals.designation = designation;
    next();
  }

module.exports = desSetter;