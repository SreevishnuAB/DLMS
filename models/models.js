var Sequelize = require('sequelize');
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
