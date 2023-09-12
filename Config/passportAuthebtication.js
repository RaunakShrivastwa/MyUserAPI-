const passport= require('passport');
const LocalStratgey= require('passport-local').Strategy;
const User = require('../Model/user')

passport.use(new LocalStratgey({
    usernameField:'email'
},function(email,passport,done){
    User.findOne({email:email}).then(data=>{
        console.log(data)
        if(!data || data.password != passport){
            console.log("Invalide User Cradential!!!");
            return done(null,false);
        }
        return done(null,data);
    }).catch(err=>{
        console.log("There is problem with finding User for Authentication!!!");
        return done(err);
    });
}));

passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id).then(result=>{
        return done(null,result);
    }).catch(err=>{
        console.log("Error with finding ---> User");
        return done(err);
    });
});


passport.cheakAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
       return next();
    }
    return res.send("Please Login first")
    // return res.redirect('/login');
}


passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
}

module.exports=passport;