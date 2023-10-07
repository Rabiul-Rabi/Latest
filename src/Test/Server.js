import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import ProductSchema from "./Schema/ProductSchema.js"
import userData from "./Schema/userData.js"

const uri= 'mongodb+srv://rabiul:rabiulwpl@wpl.7dy7dit.mongodb.net/Exclusive?retryWrites=true&w=majority';
var CollectionName="NewArrivals";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('Connected to MongoDB');
    list();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  // store all the collection in array
  const AllCollections=[];
  async function list() {
    
    try {

      const collections = await mongoose.connection.db.listCollections().toArray();
      collections.forEach((collection) => {
        AllCollections.push(collection.name);
      });
    } catch (error) {
      console.error('Error listing collections:', error);
    }
  }


const app = express();
app.use(cors());
app.use(express.json());

// Setting api 
app.get('/', async (req, res) => {
  res.send('Server is running');
});

// Return all collections
app.get('/collections',async(req,res)=>{
    const jsonContent = JSON.stringify(AllCollections);
    res.end(jsonContent);
})

// Set collection in admin panel
app.post('/coll',async(req,res)=>{
  CollectionName=req.body.value;
    console.log(req.body);
    console.log(req.body.value);
    res.end(CollectionName);
})

// Add data in Database in Admin Panel
app.post('/Add', async (req, res) => {
  try {
    const dataToInsert = req.body;
    const readData = mongoose.model(CollectionName, ProductSchema, CollectionName);
   const DataSave= new readData(dataToInsert)
    await DataSave.save();
    console.log("Data submited SuccessFully")
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete from Database from admin panel
app.delete('/dataDel/:id', async (req, res) => {
  const id = req.params.id;
  const readData = mongoose.model(CollectionName, ProductSchema, CollectionName);

  try {
    const response = await readData.deleteOne({ _id: id });
    console.log(response);
    res.status(204).end()
    
}catch(error){
console.log(error)
}
});

// Do edit from admin panel
app.post('/edit', async (req, res) => {
  const formData = req.body;
  const readData = mongoose.model(CollectionName, ProductSchema, CollectionName);

  try {
    const filter = { _id: formData._id }; 
    const updateData = { $set: formData }; 
    const response = await readData.updateOne(filter, updateData);

    if (response.nModified === 1) {
      console.log('Document updated successfully');
      res.status(204).end(); 
    } else {
      console.log('Document not found or not updated');
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error status
  }
});


// Get the data from admin
app.get('/data',async(req,res)=>{
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ error: 'MongoDB not connected' });
          }
        const readData=await mongoose.model(CollectionName,ProductSchema,CollectionName)
        const data=await readData.find();
        res.json(data);
        } catch (error) {
        console.log(error);
        }
    
})


// Get data of user
app.get('/userdata', (req, res)=>{
  const Collection = req.query.cName;
  const readData=  mongoose.model(Collection,ProductSchema,Collection)
  console.log(Collection)
  readData.find().then(result=>{
      res.status(200).json(result);
  })
  .catch(err=>{
      console.error(err);
  });
})


// User Area 

// import userData from './Schema/userData.js';

app.post('/signUp', (req,res)=>{
  const mydata = req.body;
  const Data = mongoose.model("useData",userData,"userData");
  const saveData = new Data(mydata)
  saveData.save();
  res.send("Successfully SignUp")
  res.end();
})

// check user exist or not

app.post('/checkUser', async(req,res)=>{
  const email =req.body.email
  const mydata = {email};
  const Data = mongoose.model("useData",userData,"userData");
  const readData = await Data.find(mydata)
  if(readData.length>0){
    console.log(readData.length)
    console.log(mydata)
    res.send("1")
  }else{
    res.send("0")
  }
  // console.log(readData)
  res.end();
})
app.post('/checkUserLog', async(req,res)=>{
  const email =req.body.email
  const password = req.body.password
  const mydata = {email,password};
 
  const Data = mongoose.model("useData",userData,"userData");
  const readData = await Data.find(mydata)
  if(readData.length>0){
    console.log(readData.length)
    console.log(mydata)
    res.send("1")
  }else{
    res.send("0")
  }
  // console.log(readData)
  res.end();
})

// post Card Data
import Card from './Schema/Card.js';
app.post('/uploadCard', async(req,res)=>{
   const data =req.body

   const Data = mongoose.model("cardData",Card,"cardData");
   const saveData = new Data(data)
   saveData.save();
  console.log(data)
  res.end();
})

app.post('/CardUser', async(req,res)=>{
  const user =req.body.userName

  const Data = mongoose.model("cardData",Card,"cardData");
  const fData = await Data.find({user})
  
  console.log(fData[0].id)
  res.send(fData[0].id)
  res.end();
})






mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB');
    const port = 2000;
    app.listen(port, () => {
      console.log('Server listening on ' + port);
    });
  });