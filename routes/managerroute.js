const express=require('express');
const path=require('path');
const routes = express.Router();
const sequlize=require("sequelize");
const db=require("../src/connection")
const user=require("../models/users");
const site=require("../models/sites");
const announcement=require("../models/announcement");
const apartment=require("../models/apartment");
const revenue=require("../models/revenue");
const bank=require("../models/bank");
const block=require("../models/block");
const dues=require("../models/dues");
const expense=require("../models/expense");
routes.get('/', (req, res) => {
  return res.render("manager/index.ejs");
});
//announcement routes
routes.get('/announcement', (req, res) => {
  announcement.findAll({raw: true}).then(data=>{
    res.render("manager/announcement.ejs",{announcement:data});
}).catch(err=>console.log("error:"+err));
});

routes.post('/announcement/add', (req, res) => {

  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
    console.log(data);
  announcement.create({
    id:null,
    title: req.body.title,
    text:req.body.text,
    site_id:data.id
})
.then(data2=> {res.redirect("/manager/announcement")}).catch((err)=>{console.log(err);{res.redirect("/manager/announcement")}})
})});

routes.post('/announcement/get', (req, res) => {
  announcement.findOne({
    raw:true,
    where:{
      id:req.body.id
    }})
.then(data2=> {res.send(data2)}).catch((err)=>{console.log(err);{res.send("err")}})
});

routes.post('/announcement/delete', (req, res) => {
  var id =req.body.id;
  announcement.destroy({
    where: {
      id: id
    }
  }).then(()=>{return res.send("ok");}).catch(err=>{return res.send("error");});
});

routes.post('/announcement/update', (req, res) => {
  const newData = {
    text: req.body.text,
    title:req.body.title
  };
  announcement.update(newData, {where: { id: req.body.id } })
  .then(()=>{res.send("ok")}
  ).catch((err)=>console.log(err));
});
//revenue route
routes.get('/revenue', (req, res) => {
  var d = new Date();
   const date={
     year:d.getFullYear(),
     month:d.getMonth()
   }
  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
  revenue.findAll({raw: true,where:{
    site_id:data.id
  }}).then(data2=>{
    bank.findAll({raw:true,where:{site_id:data.id}}).then(data3=>{
          return res.render("manager/revenue.ejs",{Revenue:data2,Bank:data3,Date:date});
    })

    
    
}).catch(err=>console.log("error:"+err));
  }).catch();
});

routes.post('/revenue/add', (req, res) => {
  console.log(req.body)
  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
    console.log(data);
    revenue.create({
    id:null,
    amount: req.body.amount,
    statement:req.body.statement,
    source: req.body.source,
    bank_id:req.body.bankid,
    site_id:data.id,
    cat_id:0
})
.then(data2=> {res.redirect("/manager/revenue")}).catch((err)=>{console.log(err);{res.redirect("/manager/revenue")}})
})});

routes.post('/revenue/get', (req, res) => {
  revenue.findOne({
    raw:true,
    where:{
      id:req.body.id
    }})
.then(data2=> {res.send(data2)}).catch((err)=>{console.log(err);{res.send("err")}})
});

routes.post('/revenue/delete', (req, res) => {
  var id =req.body.id;
  revenue.destroy({
    where: {
      id: id
    }
  }).then(()=>{return res.send("ok");}).catch(err=>{return res.send("error");});
});

routes.post('/revenue/update', (req, res) => {
  console.log(req.body);
  const newData = {
    amount: req.body.amount,
    statement:req.body.statement,
    source: req.body.source,
    bank_id:req.body.bankid
  };
  revenue.update(newData, {where: { id: req.body.id } })
  .then(()=>{res.send("ok")}
  ).catch((err)=>console.log(err));
});

//expense route
routes.get('/expense', (req, res) => {
  var d = new Date();
   const date={
     year:d.getFullYear(),
     month:d.getMonth()
   }
  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
  expense.findAll({raw: true,where:{
    site_id:data.id
  }}).then(data2=>{
    bank.findAll({raw:true,where:{site_id:data.id}}).then(data3=>{
          return res.render("manager/expense.ejs",{Revenue:data2,Bank:data3,Date:date});
    })
    }).catch(err=>console.log("error:"+err));
  }).catch();
});
routes.post('/expense/add', (req, res) => {
  console.log(req.body)
  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
    console.log(data);
    expense.create({
    id:null,
    amount: req.body.amount,
    statement:req.body.statement,
    source: req.body.source,
    bank_id:req.body.bankid,
    site_id:data.id,
    cat_id:0
})
.then(data2=> {res.redirect("/manager/expense")}).catch((err)=>{console.log(err);{res.redirect("/manager/expense")}})
})});

routes.post('/expense/get', (req, res) => {
  expense.findOne({
    raw:true,
    where:{
      id:req.body.id
    }})
.then(data2=> {res.send(data2)}).catch((err)=>{console.log(err);{res.send("err")}})
});

routes.post('/expense/delete', (req, res) => {
  var id =req.body.id;
  expense.destroy({
    where: {
      id: id
    }
  }).then(()=>{return res.send("ok");}).catch(err=>{return res.send("error");});
});

routes.post('/expense/update', (req, res) => {
  console.log(req.body);
  const newData = {
    amount: req.body.amount,
    statement:req.body.statement,
    source: req.body.source,
    bank_id:req.body.bankid
  };
  expense.update(newData, {where: { id: req.body.id } })
  .then(()=>{res.send("ok")}
  ).catch((err)=>console.log(err));
});
//apartment route
routes.get('/apartment', (req, res) => {
  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
    sequelize.query('CALL getuser (:id)', 
        {replacements: { id: data.id }})
  .then(data2=>{
    block.findAll({raw:true,where:{
          site_id:data.id
    }}).then(data3=>{
      res.render("manager/apartment.ejs",{block:data3,user:data2});
    });  
  });
  });
});

routes.post('/apartment/get',(req,res) => {
  user.hasOne(apartment,{foreignKey: 'user_id'});
  apartment.belongsTo(user,{foreignKey: 'user_id'});
  apartment.findAll({ 
  include: [{
    model: user,
    required: false,
    attributes:[["name","name"],["lastname","lastname"]]
    }],
   where:{block_id:req.body.id}})
   .then(data=>{
     var len=Object.keys(data).length;
     if(len==0){
       res.send("0");
     }else{
     return res.json(data);
     }
   }).catch(err=>{
     console.error(err);
   });
 });
 routes.post('/apartment/detail/get',(req,res) => {
  apartment.findOne({ 
   where:{id:req.body.id}})
   .then(data=>{
     var len=Object.keys(data).length;
     if(len==0){
       res.send("0");
     }else{
     return res.json(data);
     }
   }).catch(err=>{
     console.error(err);
   });
 });
//dues route
routes.get("/dues",(req,res)=>{
  var d = new Date();
   const date={
     year:d.getFullYear(),
     month:d.getMonth()
   };

  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
    dues.findAll({raw: true,where:{
      site_id:data.id
    }}).
    then(data2=>{
    bank.findAll({raw:true,where:{site_id:data.id}}).
      then(data3=>{
        dues.findOne({
          raw:true,
          where:{
            site_id:data.id,
            month:date.month+1,
            year:date.year
          }
        }).then(data4=>{
          var len;
          console.log(data4);
          if(data4==null){
            len=0;
          }else{
           len=Object.keys(data4).length ;
          }
          console.log(len);
          return res.render("manager/dues.ejs",{Date:date,datalen:len,dues:data2})})
        })
        
  }).catch(err=>console.log(err))
})
});

routes.post('/dues/add', (req, res) => {
  var d = new Date();
  const date={
    year:d.getFullYear(),
    month:d.getMonth()
  };
  site.findOne({raw:true,where:{user_id:req.session.userid}}).then(data=>{
    console.log(req.body);
  dues.create({
    id:null,
    year:date.year,
    month:date.month+1,
    amount:req.body.amount,
    site_id:data.id
})
.then(data2=> {res.redirect("/manager/dues")}).catch((err)=>{console.log(err);{res.redirect("/manager/dues")}})
})});
    
module.exports = routes;