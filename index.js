
express=require('express');
const app = express();
const db=require("./src/connection");
const routes = require('./routes/route');
const userroutes = require('./routes/userroute');
const managerroutes = require('./routes/managerroute');
const adminroutes = require('./routes/adminroute');
const Sequelize=require("sequelize");
var bodyParser = require('body-parser')
var session = require('express-session');
var ejs = require('ejs');
var path=require('path');
var MongoStore = require('connect-mongo')(session);
app.engine('.ejs', ejs.__express);



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views'))); 
app.use(Sequelize);
app.use(session({name:   'obcured.sid',
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie:{  httpOnly: true, secure: true, maxAge: 1000*60*60*2 },
 store: new MongoStore({ mongooseConnection: mongoose.connection })

}));

app.use("/",routes);
app.use("/manager",managerroutes);
app.use("/user",userroutes);
app.use("/admin",adminroutes);

//db test
db.authenticate().then(()=>console.log("databese connected"))
// Turn on that server!
app.get("/",(req,res)=>{
  res.send("ok");
})

app.listen(30, () => {
  console.log('App listening on port 3000');
});

