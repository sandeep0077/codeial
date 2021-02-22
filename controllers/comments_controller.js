const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = function(req,res){
    // we need to create a comment over a post but first we need to find whether that post exist or not
    //req.body.post is from hidden input tag in home.ejs file with name="post"
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                // addding comment top the post,it will automatically fetch the id and pushit
                // first time updating something
                //"comments" is from "post's" schema
                post.comments.push(comment);

                //whenever i am updating something we need to call save, so that it get's saved in the database,otherwise it will be saved in ram
                post.save();

                res.redirect('/')
            });
        }
    });
    // now create a route for comment
}