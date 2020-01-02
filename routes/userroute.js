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
const duesp=require("../models/dues_payment");
const expense=require("../models/expense");

routes.get('/', (req, res) => {
  return res.render("user/index.ejs");
});
routes.get('/announcement', (req, res) => {
  sequelize.query('CALL getannouncement (:id)', 
        {replacements: { id: req.session.userid }}).then(data=>{
          console.log(data);
    res.render("user/announcement.ejs",{announcement:data});
}).catch(err=>console.log("error:"+err));
});
routes.get('/revenue', (req, res) => {
  sequelize.query('CALL getrevenue (:id)', 
        {replacements: { id: req.session.userid }}).then(data=>{
    res.render("user/revenue.ejs",{Revenue:data});
}).catch(err=>console.log("error:"+err));
});
routes.get('/expense', (req, res) => {
  sequelize.query('CALL getexpense (:id)', 
        {replacements: { id: req.session.userid }}).then(data=>{
    res.render("user/expense.ejs",{Revenue:data});
}).catch(err=>console.log("error:"+err));
});
routes.get('/dues', (req, res) => {
  sequelize.query('CALL getbank (:id)', 
        {replacements: { id: req.session.userid }}).then(data2=>{
  sequelize.query('CALL getdues (:id)', 
        {replacements: { id: req.session.userid }}).then(data=>{
          console.log(data);
    res.render("user/dues.ejs",{Revenue:data,bank:data2});
}).catch(err=>console.log("error:"+err))})
});
routes.post('/dues/get', (req, res) => {
dues.findOne({raw:true,where:{
  id:req.body.id
}}).then(data2=> {res.send(data2)}).catch((err)=>{console.log(err);{res.send("err");console.log(err)}})
});
routes.post('/dues/add', (req, res) => {
  duesp.create(
    {
      id:null,
      bank_id:req.body.bankid,
      dues_id:req.body.duesid,
      user_id:req.session.userid
    }
  ).then(()=>{res.send("ok")}).catch((err)=>{res.send("err");console.log(err)});
});
module.exports = routes;