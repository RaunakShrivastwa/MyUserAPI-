const express =require('express');
const db = require('./Config/Db');
const ejs= require('ejs');
const router = require('./Router/Route');
const cookieParser= require('cookie-parser')
const passport = require('passport');
const local= require('./Config/passportAuthebtication');
const session = require('express-session');
const MongoStore= require('connect-mongo')

const app=express();
const PORT=8001;
app.use(cookieParser());
app.set('view engine','ejs');
app.set('views','./views')
app.use(express.static('./AssertData'))

// for the session
app.use(session({
   name: 'Khushi',
   // TODO change the secret before deployment in production mode
   secret: 'blahsomething',
   saveUninitialized: false,
   resave: false,
   cookie: {
       maxAge: (1000 * 60 * 100)
   },
   store: new MongoStore(
       {
       mongoUrl: 'mongodb://127.0.0.1:27017/Shubham',
       autoRemove: 'disabled'
       },
       function(err){
           console.log(err || 'connect-mongo db setup ok');
       }
   )
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
   function(req,res,next){
       if(req.isAuthenticated()){
           res.locals.user=req.user
       }
       next();
   }
)
app.use('/',router);



// your Server Configuration
app.listen(PORT,(err)=>{
   if(err){
      console.log("There is Problem with Your Server");
      return;
   }
   console.log("Your Server Started at PORT ",PORT);
})