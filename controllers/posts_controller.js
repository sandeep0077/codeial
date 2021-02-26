// import Post that belongs to the post schema and we r naming it "Post"
const Post = require('../models/post');

//importing comment schema
const Comment = require('../models/comment')

// we are creating an action to submit the data of the post form and saving it in the database
module.exports.create = async function (req, res) {
    //creating a post in database

    try {
      let post =   await Post.create({
            content: req.body.content,
            //passing the user
            // we took this user._id through req from "passport.setAuthenticatedUser" in "index.js"(codeial)
            // which inturn is in config with " res.locals.user = req.user"(passport.setAuthenticatedUser function) 
            //which is present in "passport-local-strategy"
            user: req.user._id
        });

        //Check if the request comming is xhr request
        if(req.xhr){
            // return some json..we treturn json with the ststus
          return res.status(200).json({
                data: {
                    post: post,
                },
                // the general form of intracting when sending back data by json
                message:"Post created"
            })
        }



        req.flash('success', "post created succesfully")
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err)
        return res.redirect('back');

    }

}


// to delete the post
module.exports.destroy = async function (req, res) {

    try {
        //find if that post exist or not and get is id from req.params.id
        let post = await Post.findById((req.params.id));

        // check user who is deleting the post has written the post
        // initially we are getting the user id(post's schema(module))..post.user is going to return the string id
        //when we are comparing id's of two object we need to convert it to string..so insted of writing req.user._id we write re.user.id which
        // automatically converts the id in to string
        if (post.user == req.user.id) {
            // finally if the post user and the logged in user are same we delete the post
            post.remove();

            // delete the comment also
            await Comment.deleteMany({ post: req.params.id });

            req.flash('success', "Post deleted")
            return res.redirect('back');

        } else {
            req.flash('error', "Error in deleting post",err)
            return res.redirect('back');
            // now got to post controller and create a route for deletion   
        }
    } catch (err) {
        req.flash('error', err)
        return res.redirect('back');
}
}