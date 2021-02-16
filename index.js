const express = require('express');
const cookieParser  = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//importing from mongoose.js
const db = require('./config/mongoose');

app.use(express.urlencoded());

//seting up cookie
app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts);

//extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

// set up the view engine
app.listen(port, function (err) {
    if (err) { 
        console.log(`Error in ruuning the server : ${err}`) 
            }
    console.log(`Server is running on port : ${port}`);
})