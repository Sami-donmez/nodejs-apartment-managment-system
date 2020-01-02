const express=require('express');
const path=require('path');
const routes = express.Router();
const sequlize=require("sequelize");
const db=require("../src/connection")
const user=require("../models/users");
const crypto = require('crypto')


routes.get('/login', (req, res) => {
	if(req.session.loggedin){
		switch (req.session.role) {
			case 1:
				res.redirect("/admin");
				break;
				case 2:
				res.redirect("/manager");
				break;
				case 2:
				res.redirect("/user");
				break;
			default:
			
				break;
		}
	}else{
  return res.render("login.ejs");
}});
routes.get("/logout",(req,res)=>{
	req.session.destroy();
	res.redirect("/login");
})
routes.post('/login' ,(req, res) => {
  var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		let hash = crypto.createHash('md5').update(password).digest("hex")
		user.findOne({
			where:{
				email:email,
				password:hash
			},raw:true
		}).then(
		 ( results)=> {
			var len=Object.keys(results).length;
			console.log(results);
			if (len> 0) {
				req.session.loggedin = true;
				req.session.email = email;
				req.session.userid = results.id;
				req.session.role=results.authorization
				switch (results.authorization) {
					case 1:
							res.send("/admin");
						break;
						case 2:
							res.send("/manager");
						break;
						case 3:
							res.send("/user");
						break;
						default:
							res.send("ok")
						break;
				}
				
			} else {
				res.send('err');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})
module.exports = routes;