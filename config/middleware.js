// middleware ha 3 arguments req,res,next
// this middleware will takeout the flash from the sessions request(user-controller) and put it in response
module.exports.setFlash = function(req,res,next){
    // we will just findout the flash from the request and set it up in locals of response 
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}

//now use this meddleware using require in index.js(codeial)