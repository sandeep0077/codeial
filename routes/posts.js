const express = require('express');
const passport = require('passport');
const router = express.Router();


// import the controller to get the action 
const postController = require('../controllers/posts_controller');


// if the user is loggedin then only show the post
//checkAuthe.. function is created in passport-local-strategy(config folder)
router.post('/create',passport.checkAuthentication,postController.create);

//":id" is params in url when we want to delete the post of paticular id and ofcourse always check for authentication 
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
//now got to views and create a button for deletion

module.exports = router;
//since we create this "post.js" router we need to call it from "index.js(routes)" just like we did with "user.js(routes)"