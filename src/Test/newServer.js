import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from "./model/userModel.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

const saltRounds = 10;
const app = express();

const uri= 'mongodb+srv://rabiul:rabiulwpl@wpl.7dy7dit.mongodb.net/Exclusive?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('Connected to MongoDB');
  
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// Home Route
app.get('/', (req, res) => {
  res.send('<h1> Welcome to the server </h1>');
});

// Register Route
app.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('User already exists');
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      try {
        const savedUser = await newUser.save();
        res.send({
          success: true,
          message: 'User is created Successfully',
          user: {
            id: savedUser._id,
            username: savedUser.username,
          },
        });
      } catch (error) {
        res.send({
          success: false,
          message: 'User is not created',
          error: error,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: 'User is not found',
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: 'Incorrect password',
    });
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, "", {
    expiresIn: '2d',
  });

  return res.status(200).send({
    success: true,
    message: 'User is logged in successfully',
    token: `${token}`,
  });
});

// Profile Route (Protected)
// app.get(
//   '/profile',
//   passport.authenticate('jwt', { session: false }),
//   function (req, res) {

//     return res.status(200).send({
//       success: true,
//       user: {
//         id: req.user._id,
//         username: req.user.username,
//       },
//     });
//   }
// );

// Logout Route (Clear Token)
app.post('/logout', (req, res) => {
  // Remove token from client-side (e.g., delete it from local storage)
  // Redirect or send response as needed
});

// Profile Route (Protected)
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




// Server Error Handling
mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
  const port = 5000;
  app.listen(port, () => {
    console.log('Server listening on ' + port);
  });
});
