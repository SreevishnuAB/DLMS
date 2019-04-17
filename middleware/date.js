getDate = (req,res,next)=>{
  var date = new Date();
  var dd = date.getDate(), mm = date.getMonth()+1;
  dd = (dd<10)?`0${dd}`:`${dd}`;
  mm = (mm<10)?`0${mm}`:`${mm}`;
  req.session.date = `${date.getFullYear()}-${mm}-${dd}`;
  next();
}

module.exports = getDate;