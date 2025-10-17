const  mongoose =require("mongoose");

const JObSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    jobType:{
        enum:[ "Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"],
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    }
},{timestamps:true});

const JobModel= mongoose.model("JobModel",JObSchema);
module.exports=JobModel;