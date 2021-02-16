module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "User's page",
        page: "ejs or controller page :)"
    })
}

module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Signup"
    })
};

// render the signin page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Signin"
    })
};

//get the signup form data
module.exports.create = function(req,res){
    //todo later
}

//get up the signin form data
module.exports.createSession = function(req,res){
//
}

