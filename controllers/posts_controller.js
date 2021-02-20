// import Post that belongs to the post schema and we r naming it "Post"
const Post = require('../models/post')


// we are creating an action to submit the data of the post form and saving it in the database
module.exports.create = function(req,res){
   //creating a post in database
    Post.create({
        content: req.body.content,
        //passing the user
        // we took this user._id through req from "passport.setAuthenticatedUser" in "index.js"(codeial)
        // which inturn is in config with " res.locals.user = req.user"(passport.setAuthenticatedUser function) 
        //which is present in "passport-local-strategy"
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("error in creating the post");
            return;
        }
        return res.redirect('back');
    })
}