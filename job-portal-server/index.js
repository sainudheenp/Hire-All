const express = require('express')
const app = express()
const cors = require("cors");
require('dotenv').config()

const port = process.env.PORT || 3000 ;
//middleware
app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.cs6cati.mongodb.net/?retryWrites=true&w=majority`  ;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //createDB
    const db= client.db("JobPortal") ;
    const JobsCollections=db.collection("Jobs");


    // post a job ,time in yt video 1:28
    app.post("/post-job" ,async(req,res)=>{
      const body = req.body ;
      body.createAt =new Date();
    
      const result = JobsCollections.insertOne(body);
      if (result.insertedId){
        return res.status(200).send(result);
      }  else {
        return res.status(404).send({
          Message : "can not insert! try again later",
          status:false        // yt time 1:32 , post data with ui
        })
      }

    })

   

    //get all jobs 
    app.get("/all-jobs" , async(req,res)=>{
      const jobs = await JobsCollections.find({}).toArray()
      res.send(jobs);
    })

    //get jobs by email
    app.get("/myjobs/:email",async(req,res) =>{
      console.log(req.params.email)
      const jobs= await JobsCollections.find({postedBy : req.params.email}).toArray();
      res.send(jobs)
    })


    //delete a job
    app.delete("/job/:id",async(req,res)=>{
      const id =req.params.id ;
      const filter= { _id: new ObjectId(id)}
      console.log(id)
      console.log((filter))
      const result=await JobsCollections.deleteOne(filter); //tset chenged id replaced by filter
      res.send(result); 
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);










app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})