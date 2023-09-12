const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Shubham');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"There is problem with connection"))
db.once('open',function(){
    console.log("Connection done...")
});

module.exports=db;