import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt'
import User from './model/userModel.js';
import jwt from 'jsonwebtoken'
const saltRounds =10;
import passport from "../User/components/passport2";

const uri= 'mongodb+srv://rabiul:rabiulwpl@wpl.7dy7dit.mongodb.net/Exclusive?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('Connected to MongoDB');
  
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize())


// Setting api 
app.get('/', async (req, res) => {
  res.send('Server is running');
});


app.post("/registers", async (req, res) => {
    try {
        console.log("thsi ",req.body.username)
      const user = await User.findOne({ username: req.body.username });
      if (user) return res.status(400).send("User already exists");
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newUser = new User({
          username: req.body.username,
          password: hash,
        });
        await newUser
          .save()
          .then((user) => {
            res.send({
              success: true,
              message: "User is created Successfully",
              user: {
                id: user._id,
                username: user.username,
              },
            });
          })
          .catch((error) => {
            res.send({
              success: false,
              message: "User is not created",
              error: error,
            });
          });
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



  app.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User is not found",
      });
    }
  
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }
  
    const payload = {
      id: user._id,
      username: user.username,
    };
  
    const token = jwt.sign(payload, "hello", {
      expiresIn: "2d",
    });
  
    return res.status(200).send({
      success: true,
      message: "User is logged in successfully",
      token: "Bearer " + token,
    });
  });


  app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
      return res.status(200).send({
        success: true,
        user: {
          id: req.user._id,
          username: req.user.username,
        },
      });
    }
  );
  
  //resource not found
  app.use((req, res, next) => {
    res.status(404).json({
      message: "route not found",
    });
  });





mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB');
    const port = 5000;
    app.listen(port, () => {
      console.log('Server listening on ' + port);
    });
  });