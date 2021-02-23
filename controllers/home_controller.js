//importing the model
const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = async function (req, res) {

  try {

      // populate the whole user object(contains its name email etc) insted of userid for each post
 let posts =  await Post.find({})
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

// to show list of all the users on home page
 // to get all the users 
let users = await User.find({});

return res.render('home', {
 title: 'Codeial Home',
 //putting the post into the context and sending it to the home view
 posts: posts,
 all_users: users
});

  }catch (err) {
   console.log(`Error: ${err}`)
   return; 
  }

     
  
}
