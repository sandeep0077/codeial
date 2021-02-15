module.exports.profile = function(req,res){
   return res.render('user_profile',{
       title : "User's page",
       page : "ejs or controller page :)"
   })

}