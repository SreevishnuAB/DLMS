var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://qrlwmsdtnnltzr:72fd6b12362abaca65b66c6462f40ed2794b5b537c9ce252e0ec063966b7670f@ec2-54-217-208-105.eu-west-1.compute.amazonaws.com:5432/d5k10ha5d9cd1t',{
  dialect:'postgres',
  dialectOptions:{
    ssl: true
  }
});

/* GET users listing. */
router.get('/student', async function(req, res, next) {
//  res.send('respond with a resource');
  var events;
  await sequelize.query('select event from events',{type:Sequelize.QueryTypes.SELECT})
    .then(result=>{
      console.log(result);
      events = result;
    })
    .catch(err=>{
      console.log(err);
    });
  if(req.session.user == undefined){
    res.redirect('../');
  }
  else{
    var user = req.session.user;
    var date = new Date();
    var dd = date.getDate(), mm = date.getMonth()+1;
    dd = (dd<10)?`0${dd}`:`${dd}`;
    mm = (mm<10)?`0${mm}`:`${mm}`;
    res.render('student',{state:true,fac:false,title:`${user.toUpperCase()} - DLMS`,session:req.session,date:`${date.getFullYear()}-${mm}-${dd}`,event:events});
    console.log(req.session.user);
  }
});

router.post('/student',async (req,res)=>{
  console.log(req.body);
  await sequelize.query(`insert into dutyleaves(id,year,semester,event,from_date,to_date,programme) values('${req.session.user}','${req.session.year}','${req.session.sem}','${req.body.event}','${req.body.from}','${req.body.to}','${req.session.prog}')`,{type:Sequelize.QueryTypes.INSERT})
    .then(async (result)=>{
      console.log(result);
//      res.json({success:true});
      await sequelize.query(`select email from faculties where programme='${req.session.prog}' and year='${req.session.year}'`,{type:Sequelize.QueryTypes.SELECT})
        .then(async result=>{
          var map = result.map((x => Object.values(x).toString()));
//          console.log(map);
          let transporter = nodemailer.createTransport({
            host:"smtp.ethereal.email",
            port:587,
            secure:false,
            auth:{
              user:'vicky.halvorson@ethereal.email',
              pass:'X1AqMjATcrbJ1CUUTZ'
            }
          });

          let mailOptions = {
            from: '"DLMS - ASAS,KOCHI" <dlms@asaskochi.com>',
            to:map,
            subject:'DLMS Pending Requests',
            text:"You have pending dutyleave requests",
          };

          let mail = await transporter.sendMail(mailOptions);
//          res.jsonp({url:nodemailer.getTestMessageUrl(mail)});
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));
          res.jsonp({url:nodemailer.getTestMessageUrl(mail)});
        })
        .catch(err=>{
          console.log(err);
        });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).jsonp({error:err});
  });
});

router.get('/student/leaves',async (req,res)=>{
  var user = req.session.user;
  await sequelize.query(`select * from dutyleaves where id='${req.session.user}'`,{type: sequelize.QueryTypes.SELECT})
    .then(leaves=>{
        console.log(leaves);
      res.render('studleaves',{state:true,fac:false,title:`${user.toUpperCase()} - Duty Leaves - DLMS`,leaves:leaves});
    });
});

router.get('/faculty',async (req,res)=>{
  if(req.session.user == undefined){
    res.redirect('../');
  }
  else{
    var user = req.session.user;
    await sequelize.query(`select * from dutyleaves where programme=(select programme from faculties where id='${req.session.user}')`,{type: sequelize.QueryTypes.SELECT})
    .then(leaves=>{
        console.log(leaves);
        res.render('faculty',{state:true,fac:true,title:`${user.toUpperCase()} - Duty Leaves - DLMS`,leaves:leaves});
      })
    .catch(err=>{
        res.send(`Sorry, something went wrong: ${err}`);
      });
    }
  });

router.post('/faculty/update',async (req,res)=>{
  console.log(req.body);
  var status = (req.body.status == 'a')?"Accepted":"Denied";
  sequelize.query(`update dutyleaves set status='${status}' where id='${req.body.id}' and event='${req.body.event}'`,{type:Sequelize.QueryTypes.UPDATE})
  .then(result=>{
    res.jsonp({success:"Updated"});
  })
  .catch(err=>{
    console.log(err);
    res.status(500).jsonp({error:err});
  });
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.jsonp({success:true});
});

router.get('/admin',async (req,res)=>{
  /* Create admin layout */
  var events,faculties,programmes;
  var user = req.session.user;
  await sequelize.query('select * from faculties',{type:Sequelize.QueryTypes.SELECT})
    .then(result=>{
      console.log(result);
      faculties = result;
    })
    .catch(err=>{
      console.log(err);
    });
  await sequelize.query('select * from events',{type:Sequelize.QueryTypes.SELECT})
    .then(result=>{
      console.log(result);
//TODO
    })
    .catch(err=>{
      console.log(err);
    });

  res.render('admin',{state:true,fac:true,title:`${user.toUpperCase()} - Duty Leaves - DLMS`,faculties:faculties});
});

module.exports = router;
