const mongoose = require('mongoose');
//provide connection to my database
mongoose.connect('mongodb://localhost/codeial_development',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mongoDB"));
db.once('open',function(){
    console.log('connected to database :: mongoDB')
})

module.exports = db;