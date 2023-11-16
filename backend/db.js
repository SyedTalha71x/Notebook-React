const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/School"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("Connection Successfull");
    }).catch(()=>{
        console.log("in error");
    })
}

module.exports = connectToMongo;