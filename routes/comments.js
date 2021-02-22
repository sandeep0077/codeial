const express = require('express');
const passport = require('passport');
const router = express.Router();


// import the controller to get the action 
const commentsController = require('../controllers/comments_controller');


// if the user is loggedin then only show the post
//checkAuthe.. function is created in passport-local-strategy(config folder)
router.post('/create',passport.checkAuthentication,commentsController.create);

module.exports = router;
//since we create this "post.js" router we need to call it from "index.js(routes)" just like we did with "user.js(routes)"