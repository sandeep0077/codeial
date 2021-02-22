//importing the model
const Post = require('../models/post');


module.exports.home = function (req, res) {

  // //Find all the post
  // Post.find({},

  // });
  // populate the whole user object(contains its name email etc) insted of userid for each post
  Post.find({})
    //populating the comments and users at the same time
  .populate('user')
  .populate({
    // "comments" from post.js(models) file in  postSchema
    //preloading the comments and displaying related users
    path:'comments',
    populate: {
      path: 'user'
    }
  })
  .exec(function (err, posts) {
    return res.render('home', {
      title: 'Codeial Home',
      //putting the post into the context and sending it to the home view
      posts: posts
    });

  });
}
