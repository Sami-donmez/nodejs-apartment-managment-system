const path=require('path');
const routes = require('express').Router();
const sequlize=require("sequelize");
const db=require("../src/connection")
const user=require("../models/users");
const block=require("../models/block");
const site=require("../models/sites");
const apartment=require("../models/apartment");
function logincheck(req,res,next) {
  if (!req.session.loggedin) {
    res.redirect("/login");
    
  }else{
  return next();
  }
}

routes.get('/',logincheck, (req, res) => {
  user.findAll({raw: true}).then(data=>{
      res.render("admin/index.ejs",{data:data[0]});
  }).catch(err=>console.log("error:"+err));
});
//site routes
routes.get('/site',logincheck, (req, res) => {
  site.findAll({raw: true}).then(data=>{
    res.render("admin/sites.ejs",{Site:data});
}).catch(err=>console.log("error:"+err));
});
routes.post('/site',logincheck, (req, res) => {
  site.findOne({raw: true,where: {id: req.body.id}}).then(data=>{
    res.json(data);
}).catch(err=>res.send("error"))
});

routes.post('/site/all',logincheck, (req, res) => {
  site.findAll({raw: true}).then(data=>{
    res.json(data);
}).catch(err=>res.send("error"))
});

routes.post('/site/delete',logincheck, (req, res) => {
  var id =req.body.id;
  site.destroy({
    where: {
      id: id
    }
  }).then(()=>{return res.send("ok");}).catch(err=>{return res.send("error");});

});

routes.post('/site/update',logincheck, (req, res) => {
  const newData = {
    name: req.body.sitename,
    address:req.body.siteaddress
  };
  site.update(newData, {where: { id: req.body.id } })
  .then(()=>res.send("ok")
  ).catch(()=>res.send("error"));
});

routes.post('/site/add',logincheck, (req, res) => {
  site.create({
    id:null,
    name: req.body.sitename ,
    address: req.body.siteaddress,
    user_id:1
}).then(function () {
   res.redirect("/admin/site");});
});
//block routes
routes.get('/block',logincheck, (req, res) => {
  site.hasMany(block,{foreignKey: 'id'});
  block.belongsTo(site,{foreignKey: 'site_id'});
  block.findAll({raw: true,attributes: [['name',"name"], ['address',"address"],["id","id"]] ,
  include: [{
  model: site,
  required: true,
  attributes:[["name","sitename"]]
   }]
  }).then(data=>{
    site.findAll({raw: true,attributes: [['name',"name"], ['id',"id"]]}).then(data2=>{
      res.render("admin/block.ejs",{Site:data2,Block:data});
    }).catch(err=>{
      console.error(err);
    });
  })
});
routes.post('/block',logincheck,(req,res)=>{
  var id=req.body.id;
  site.hasMany(block,{foreignKey: 'id'});
  block.belongsTo(site,{foreignKey: 'site_id'});
  block.findOne({raw: true,attributes: [['name',"name"], ['address',"address"],["id","id"]] ,
  include: [{
  model: site,
  required: true,
  attributes:[["name","sitename"]]
   },
 ], where:{"id":id}
  }).then(data=>{
    site.findAll({raw: true,attributes: [['name',"name"], ['id',"id"]]}).then(data2=>{
      var result={};
      result.name=data.name;
      result.address=data.address;
      result.sitelist=data2;

      return res.json(result);
    }).catch(err=>{
      console.error(err);
    });
  })
})

routes.post('/block/get',logincheck,(req,res) => {
 block.findAll({
  raw: true,
  attributes: [['name',"name"], ['id',"id"]],
  where:{site_id:req.body.id}})
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

routes.post('/block/add',logincheck,(req,res) => {
  block.create({
    id:null,
    name: req.body.blockname ,
    address: req.body.blockaddress,
    site_id:req.body.siteid
})
.then(function () {
   res.redirect("/admin/block");
});
});

routes.post('/block/delete',logincheck, (req, res) => {
  var id =req.body.id;
  block.destroy({
    where: {
      id: id
    }
  }).then(()=>{return res.send("ok");}).catch(err=>{return res.send("error");});

});
routes.post('/block/update',logincheck,(req,res)=>{
  const newData = {
    name: req.body.blockname,
    address:req.body.blockaddress,
    site_id:req.body.siteid
  };
  block.update(newData, {where: { id: req.body.id } })
  .then(()=>res.send("ok")
  ).catch(()=>res.send("error"));
})
//apartment routes
routes.get('/apartment', (req, res) => {
  site.findAll({raw: true}).then(data=>{
    res.render("admin/apart.ejs",{Site:data});
}).catch(err=>console.log("error:"+err));

routes.post('/apartment/get',logincheck,(req,res) => {
  apartment.findAll({
   raw: true,
   attributes: [['name',"name"], ['id',"id"]],
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

routes.post('/apartment/add',logincheck,(req,res) => {
  console.log(req.body);
  apartment.create({
    id:null,
    name: req.body.apartmentname ,
    block_id:req.body.blockid,
    status:0,
    user_id:1
})
.then(function () {
   res.send("ok");
}).catch((err)=>{console.log(err);res.send("err")})
});
});
routes.post('/apartment/delete',logincheck, (req, res) => {
  var id =req.body.id;
  apartment.destroy({
    where: {
      id: id
    }
  }).then(()=>{return res.send("ok");}).catch(err=>{return res.send("error");});
});
//user routes
routes.get('/user',logincheck, (req, res) => {
  user.hasOne(site,{foreignKey: 'user_id'});
  site.belongsTo(user,{foreignKey: 'user_id'});
  site.findAll({raw: true,attributes: [['name',"name"],["id","id"]] ,
  include: [{
  model: user,
  required: false,
  attributes:[["name","name"],["email","email"],["id","userid"]]}]
  }).then(data=>{
   res.render('admin/user.ejs',{Site:data});
  })
});
routes.post('/user/update',logincheck, (req, res) => {
 
  user.findOne({raw:true,where:{identify:req.body.useridentify}}).then(data=>{
    const newData = {
      user_id: data.id
    };
    site.update(newData, {where: { id: req.body.siteid } })
    .then(()=>res.redirect("/admin/user")
    ).catch(()=>res.send("error"));
  })
  
});
module.exports = routes;