const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async function (req, res) {

    try {
        // we need to create a comment over a post but first we need to find whether that post exist or not
        //req.body.post is from hidden input tag in home.ejs file with name="post"
        let post = await Post.findById(req.body.post)
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            // addding comment top the post,it will automatically fetch the id and pushit
            // first time updating something
            //"comments" is from "post's" schema
            post.comments.push(comment);

            //whenever i am updating something we need to call save, so that it get's saved in the database,otherwise it will be saved in ram
            post.save();

            res.redirect('/');

        }

    } catch (err) {
        console.log(`Error : ${err}`);
        return;
    }

    // now create a route for comment
}



//deleting a comment
module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id)
        // 1st check if the userid matches
        if (comment.user == req.user.id) {

            // before deleting the comment we need to fetch the post.id(save the post id in a variable) of the comment, then go to that postid
            // find the paticular comment inside the array of comments and delete it     
            let postId = comment.post;

            comment.remove();
            //after deleting the comment the post needs to be updated and pull out the comment id from the array of comments
            // second parameter is inbuilt
            //pull the comment(req.params.id) from the array of comments(post schema)
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
            return res.redirect('back');

        } else {
            return res.redirect('back');
            // now create a route for it just like when u deleted the post
        }
    } catch (err) {
        console.log(` Error : ${err}`);
        return;
    }

}