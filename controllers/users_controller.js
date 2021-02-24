//importing the model for schema from user.js(models)
const User = require('../models/user');


module.exports.profile = function(req, res) {
    // show the profile of the user to which this id belongs to
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('error in finding user while accessing profile');
            return;
        }
        if(!user) {
            return res.redirect('back')
        } else {
            return res.render('user_profile', {
                title: "User's page",
                profile_user: user
            });
        }
        // now map this whole thing to the profilepage other wise it won't shows 
    });
 
}

module.exports.update = function(req,res){
    // check if the current loggedin user is requesting update form
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        // frist time handling error
        return res.status(401).send('Unauthorized');
    }
}



//Render the signup page
module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Signup"
    })
};

// render the signin page
module.exports.signIn = function(req, res) {

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

