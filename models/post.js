const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    //incluse the arrays of ids of all comments in this post schema itself so that the comments loads with posts
    comments:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
}, {
    timestamps: true
});

// before exporting we need to tell that this is going be the model in the database
const Post = mongoose.model('Post', postSchema);

// export the model
module.exports = Post;

//next step is to go to the views(home.ejscreated post form) and create a form where this collection will have a document in it i.e an entry is created in he database