const mongodb = require("mongodb");

// const connectionString = "mongodb://localhost:27017"; | This is the string from MongoDB Compass
// ^ This doesn't work, so I'm using 'mongodb://127.0.0.1:27017' instead

const connectionString = "mongodb://127.0.0.1:27017";
const clinet = new mongodb.MongoClient(connectionString);

async function connectDb() {
    clinet.connect(); // Like this we connect to the client; like we press connect button in MongoDB Compass

    const db = clinet.db("DogsDB"); // Like this we connect to the current database
    const dogs = db.collection("dogs"); // Like this we connect to the current database collection

    const result = await dogs.find().toArray(); // Like this we take all records in 'dogs' collection
    // await when we try to read from database
    console.log(result);
}

connectDb();