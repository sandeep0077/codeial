const express = require('express');
const passport = require('passport');
const router = express.Router();


// import the controller to get the action 
const postController = require('../controllers/posts_controller');

router.post('/create',postController.create);

module.exports = router;
//since we create this "post.js" router we need to call it from "index.js(routes)" just like we did with "user.js(routes)"