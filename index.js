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
     const jobData = await createJob(req.body);
     if(jobData){
        res.status(201).json({message:"job created successfully",job:jobData})
     }else{
        res.status(400).json({message:"Failed to create job"})
     }
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
})

////////Get single job id api /////
async function getJobById (id){
    try{
    const job =await jobRouter.findById(id);
    return job;
    }catch(error){
        throw error;
    }
}
app.get("/jobs/:jobId",async(req,res)=>{
    try{
    const jobId = await getJobById(req.params.jobId);
    if(!jobId){
        res.status(404).json({message:"Job not found"})
    }else{
        res.status(200).json({job:jobId})
    }
    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
})

///////delete job api/////////
async function deleteJobById(id){
    try{
   const deletedJob =await jobRouter.findByIdAndDelete(id);
   return deletedJob;
    }catch(error){
        throw error;
    }
}
app.delete("/jobs/:jobId",async(req,res)=>{
    try{
   const deletedJob =await deleteJobById(req.params.jobId);
   if(!deletedJob){
    res.status(404).json({message:"Job not found"})
   }else{
    res.status(200).json({message:"Job deleted successfully",job:deletedJob})
   }
    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
})

app.get("/",(req,res)=>{
    res.send("Job portal backend is running")
});


const PORT =process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
