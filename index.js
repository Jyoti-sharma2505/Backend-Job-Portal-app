const {connectDB}=require("./db/db.connect");
connectDB();
const express=require("express");
const app=express();
const jobRouter=require("./models/Job.models");
const cors=require("cors");
app.use(cors());

app.use(express.json());


///////Get jobs Api/////////

 async function getJobs () {
    try{
    const jobs =await jobRouter.find();
    return jobs;
    }catch(error){
        throw error
    }
}
app.get("/jobs",async (req,res)=>{
    try{
    const jobs = await getJobs();
    if(jobs.length===0){
        res.status(404).json({message:"No jobs found"})
    }else{
        res.status(200).json({jobs:jobs})
    }
    }catch(errror){
        res.status(500).json({error:"Internal Server Error"})
    }
})

///////Post job api/////////
async function createJob (JObData){
    try{
    const newJobs = new jobRouter(JObData);
    const savedJob = await newJobs.save();
    return savedJob;
    }catch(error){
        throw error;
    }
}
app.post("/jobs",async (req,res)=>{
    try{
     const jobData = createJob(req.body);
     if(!jobData.title || !jobData.companyName || !jobData.location || !jobData.salary || !jobData.jobType || !jobData.description ||!jobData.qualification){
        res.status(400).json({error:"All fields are required"})
     }else {
        res.status(201).json({jobData:"job created successfylly",jobData:jobData})
     }
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
})

app.get("/",(req,res)=>{
    res.send("Job portal backend is running")
});

const PORT =process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
