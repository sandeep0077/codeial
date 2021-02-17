const express = require('express');
const router = express.Router();
const passoport = require('passport')

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create',usersController.create);

// create-session is from views folder for user_signin.ejs
//use passport as a middlewear to authenticate
router.post('/create-session',passoport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession)

module.exports = router;