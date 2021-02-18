const express = require('express');
const cookieParser  = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//importing from mongoose.js
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//Server is every time resetting the server cookie and telling the browser to remove it from itself,So store it i n your db/mongodb.
// for that we use "mongo store" and a library called "connect mongo"
//It requires an argument (session ) unlike any other library till now
const MongoStore  = require('connect-mongo')(session);

app.use(express.urlencoded());

//seting up cookie
app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts);

//extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//MongoStore is used to store the session cookie in db
app.use(session({
    name:'codeial',
    // TOdO change the secrete before deployment in production mode 
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    //Call back function incase if the connection is not established
    function(err){
        consile.log(err || "connect-mongodb setup ok");
    }
    )
}));

//tell the app to use passoport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));



app.listen(port, function (err) {
    if (err) { 
        console.log(`Error in ruuning the server : ${err}`) 
            }
    console.log(`Server is running on port : ${port}`);
})