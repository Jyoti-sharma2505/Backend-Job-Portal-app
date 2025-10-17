const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async ()=>{
     await mongoose.connect(process.env.Mongo_Url)
    .then(()=>{
        console.log("MOngoDB connect successfully");
    }).catch((err)=>console.log(err))
}

module.exports = {connectDB};