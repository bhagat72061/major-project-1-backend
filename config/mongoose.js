const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db= mongoose.connection;

db.on('error', console.error.bind(console,"erroe in connecting the db"));


db.once('open',function(){
    console.log("successfully connected to db");
});


module.exports=db;