const mongoose = require('mongoose');

//importing multer
const multer = require('multer')

//require path where the file will be stored
const path = require('path')

//define the path
const AVATAR_PATH = path.join('/uploads/users/avatars')


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type : String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }, 
    avatar:{
        type: String
    }
},{
    timestamps: true
});


//define the storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..' , AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

 // use the storage
// static functions
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);
module.exports = User;