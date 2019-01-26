import express from 'express';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

// Configure environment variables for server
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Get OAuth client for server verification of the user
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID);

const MongoClient = mongodb.MongoClient;
const mongodbUrl = process.env.REACT_APP_MONGODB_URI;
let abiertoDb = null;

// Name of our database
const DB_NAME = 'abierto';

// Body parser middleware for json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 * Verify user when one tries to connect to the app
 *
 * This is done by-
 * 1. Verifying the integrity of id token
 * 2. Match the client id from the token with our provided client id
 */
const verifyUser = async (token) => {
  // Verify the integrity of id token recieved
  // If verification fails, it will throw an error which is then handled by the caller
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID
  });

  //Get the data after verification
  const payload = ticket.getPayload();

  // Verify the client id
  let clientId = payload['aud'];
  if (clientId !== process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID) {
    // If client id didn't match, create authentication error
    throw new Error('Authentication error!');
  }

  // By this time, user has been verified!
  // Return the user data
  return {
    uid: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture
  };
};

// Connect to our MongoDb database
MongoClient.connect(
  mongodbUrl,
  { useNewUrlParser: true },
  (err, db) => {
    if (err) throw err;

    abiertoDb = db.db(DB_NAME);
  }
);

/*
 * Handle API reuqest to check if a user exists.
 *
 * Query the db for the user. If found, return the user data
 */
app.get('/api/v1/checkUser', (req, res) => {
  abiertoDb.collection('user-list').findOne(req.query, (err, result) => {
    if (err) {
      res.status(500).json({ "reason": "Internal error" });
      return;
    }

    res.json(result);
  });
});

/*
 * Handle API request to create a user
 *
 * First, verify the integrity of token recieved and match the client id
 * Then, check if user already exists. If exists, return user data.
 * If user doesn't exists, create one and return user's data.
 */
app.post('/api/v1/createUser', (req, res) => {
  // Verify integrity of id token and client id
  verifyUser(req.body.id_token)
    .then(user => {
      // Verification successful!

      // Find id user exists in databse
      abiertoDb.collection('user-list').findOne(user, (err, result) => {
        if (err) {
          res.status(500).json({ "reason": "Internal error" });
          return;
        }

        // If user doesn't exist, create one. Else, return data
        if (result === null) {
          // User doesn't exist, create one and return the data
          abiertoDb.collection('user-list').insertOne(user, (err, resMongo) => {
            if (err) {
              res.status(500).json({ "reason": "Internal error" });
              return;
            }

            res.status(200).json(user);
          });
        } else {
          // User already exists, just return the data
          res.status(200).json(user);
        }
      });
    })
    .catch(err => {
      // Verification failed
      res.status(400).json({ "reason": "Authentication failed" });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));