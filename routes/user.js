const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');

// add the id to it to display the relevant user profile now make changes in user controller 
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create',usersController.create);

// create-session is from views folder for user_signin.ejs
//use passport as a middlewear to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);


module.exports = router;