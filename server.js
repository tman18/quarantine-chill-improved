const path = require('path');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(express.json());


// POST pairing to database
app.post('/api/mongodb/quarantine-chill/test', (request, response) => {
  const data = request.body;

  db.collection("test")
    .insert(data, (err, results) => {
      // Got data back.. send to client
      if (err) throw err;

      response.json({
        'results': results,
      });
    });
});

// GET pairings from database
app.get('/api/mongodb/quarantine-chill/test', (request, response) => {

  db.collection("test")
    .find({
      valid: true, 
      movieOverview: {"$nin": [""]},
      recipeInfo: {"$nin": [""]}
     })
    .toArray((err, results) => {
      // Got data back.. send to client
      if (err) throw err;
      response.json(results);
    });
});


/////////////////////////////////////////////
// Boilerplate, no need to touch what's below

/////////////////////////////////////////////
// Logger & configuration
function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}
app.use(logger);
/////////////////////////////////////////////


// For production, handle any requests that don't match the ones above
app.use(express.static(path.join(__dirname, 'client/build')));

// Wild-card, so handle everything else
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


// Set up configuration variables
if (!process.env.MONGODB_URI) {
  console.log('- Error - Must specify the following env variables:');
  console.log("MONGODB_URI='mongodb://someUser:somePW@site.com:1234/someDB'");
  console.log('- (See README.md)');
  process.exit(1);
}
const MONGODB_URL = process.env.MONGODB_URI;
const splitUrl = MONGODB_URL.split('/');
const mongoDbDatabaseName = splitUrl[splitUrl.length - 1];

let db;
// First connect to MongoDB, then start HTTP server
MongoClient.connect(MONGODB_URL, {useNewUrlParser: true}, (err, client) => {
  if (err) throw err;
  console.log("--MongoDB connection successful");
  db = client.db(mongoDbDatabaseName);

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`
      *********************************************
      * Insecure prototyping backend is running!  *
      * Only use for prototyping                  *
      * Backend server up at ${PORT}              *
      *********************************************
    `);
  })
});
