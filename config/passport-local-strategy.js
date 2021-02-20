const passport = require('passport');

//require local library with strategy property
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/user');

//creating local authentication using passport
//we need to tell passport to use this LocalStrategy that we created
passport.use(new LocalStrategy({
   usernameField:"email",                   // "email" same as that in schema
 },
   function(email,password,done)  {       // done is the callback function which is reporting bacj to passport.js

      //find the user and establish the identity
      User.findOne({email: email},function(err,user){  // first email is property and from schema and second email is parameter which we passes in the above function
          if(err){
              console.log("error in finding user --> passport")
              // this will report an error to passport
              return done(err);
          }

          if(!user || user.password!=password){
              return console.log("invalid user name or password")
              //authentication is false
              return done(null,false)
          }
            // if user is found
          return done(null,user)
      });     
   }
));

// serializing the user to decide which key to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id)
})


//deserializing the user from the key in the cookies
//first cookie sent to the browser,browser makes the request,browser sent back the user id which need to be deserialize
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user --> passport")
            // this will report an error to passport
            return done(err);
        }
        return done(null,user);
    })
});

//Sending data of current user to views
//check if user is authenticated and will be using the function as a middlewear
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in ,then passed on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signedin
    return res.redirect('/user/sign-in')
}

//once the user is signedin
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user containes the current signed in user from session cookie and we r just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;