// import Post that belongs to the post schema and we r naming it "Post"
const Post = require('../models/post');

//importing comment schema
const Comment = require('../models/comment')

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


// to delete the post
module.exports.destroy = function(req,res){
    //find if that post exist or not and get is id from req.params.id
    Post.findById((req.params.id),function(err,post){
    
        // check user who is deleting the post has written the post
        // initially we are getting the user id(post's schema(module))..post.user ig going to return the string id
        //when we are comparing id's of two object we need to convert it to string..so insted of writing req.user._id we write re.uer.id which
        // automatically converts the id in to string
        if(post.user == req.user.id){
            // finally if the post user and the logged in user are same we delete the post
            post.remove();

            // delete the comment also
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back')
            });
        }else{
            return res.redirect('back')
              // now got to post controller and create a route for deletion   
        }
    })
}