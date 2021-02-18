//importing the model
const User = require('../models/user');


module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "User's page",
        page: "ejs or controller page :)"
    })
}

module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Signup"
    })
};

// render the signin page
module.exports.signIn = function (req, res) {

    if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Signin"
    })
};

//get the signup form data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in findig user in signing in");
            return
        }
        //if user is not found create the user
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log("error in creating user while signing up"); return; };

                return res.redirect('/user/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    })
}

//get up the signin form data
module.exports.createSession = function (req, res) {
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/')
}