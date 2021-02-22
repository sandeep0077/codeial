const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('router loaded');

router.get('/',homeController.home);

//requiring the relevant routes
router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'))


module.exports = router;