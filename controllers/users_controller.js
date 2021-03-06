//importing the model for schema from user.js(models)
const User = require('../models/user');
const fs = require('fs')
const path = require('path');

module.exports.profile = function(req, res) {
    // show the profile of the user to which this id belongs to
   User.findById(req.params.id,function(err,user){
        
            return res.render('user_profile', {
                title: "User's page",
                profile_user: user
            });
        })    ;    
        // now map this whole thing to the profilepage other wise it won't shows 
}
 


module.exports.update = async function(req,res){
  
    if(req.user.id == req.params.id){

        try {
            
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function(err){
               if(err){
                   console.log('******multer error', err)
               }
               user.name = req.body.name;
               user.email = req.body.email;
               
               if(req.file){

                if(user.avatar){
                    // to delete the existing image file if there is one
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                }
                   // this is saving the path of the uploaded file into the avatar fiels in the user
                   user.avatar = User.avatarPath + '/' + req.file.filename
               }
               user.save();
               return res.redirect('back');
            })


        } catch (error) {
            req.flash('error', err)
            return res.redirect('back');
        }

    }   else{
        req.flash('error','UnAuthorized ')
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
        req.flash('error', 'Passwords do not match');
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
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    })
}

//get up the signin form data
// when the user has signed in create session is called
module.exports.createSession = function (req, res) {
    //create a flash message
    req.flash('success','Logged In Sucessfully')
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout();
       //create a flash message which needed to be passed on to the html/ejs template
       req.flash('success','Logged Out')
       // now this flash message needs to be send with response but then we have to pass this request with every reponse
       // insted we will create our custom middlewear for it. Create a middleware i config folder 
    return res.redirect('/')
}

