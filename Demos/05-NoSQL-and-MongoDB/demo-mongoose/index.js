const mongoose = require("mongoose"); // Like this we add Mongoose
const Dog = require("./models/Dog"); // Here we add the file

const CONNECTION_STR = "mongodb://127.0.0.1:27017"; // Connection string | This doesn't work: mongodb://localhost:27017
const DATABASE_NAME = "DogsDB"; // Table name we want to connect with

async function connectDb() { // Async function to connect to the database
  await mongoose.connect(`${CONNECTION_STR}/${DATABASE_NAME}`); // Like this we connect mongoose to the database
  console.log(`Connected to database ${DATABASE_NAME} ...`);

  // Static, virtual, methods
    // const dogs = await Dog.find(); // Like this we take all records from database. There's no need to add '.toArray', bacause Mongoose add it.
    // console.log(dogs);

    // dogs.forEach((dog) => dog.bark()); // This is from added methods

    // dogs.forEach((dog) => console.log(dog.description)); // This is from virtual methods

    // const d = await Dog.getDogsCollection(); // This is the static method from 'Dog.js'
    // console.log(d);

  // CREATE
  // Variant 1
    // const newDog = new Dog({ name: "Lil", age: 4, color: "orange" });
    // newDog.save(); // Like this we save the record in database

  // Variant 2
    // const newDog = await Dog.create({ name: "Sharo", age: 8, color: "sharen" });
    // console.log(newDog);

  // READ
    // const dogs = await Dog.find(); // Return array
    // const dogs = await Dog.find({ age: 1 }); // Return array
    // const dogs = await Dog.findOne(); // Return object
    // const dogs = await Dog.findOne({ age: 4 }); // Return object
    // const DOG_ID = "6513075c36a396eea6dde849";
    // const dogs = await Dog.findById(DOG_ID);

  // UPDATE
  // Variant 1 | Edit with '.updateOne()'
  //   const updatedDog = await Dog.updateOne(
  //     { name: "Lisko" },
  //     { $set: { age: 199 } }
  //     // {  { age: 99 } } // mongoose way
  //   ); // dollar-sign syntax native mongodb
  //   console.log(updatedDog);

  // Variant 2 | Edit with id
  //   const DOG_ID = "65131fc7a9d8dd55fa59856b";
  //   const dog = await Dog.findById(DOG_ID);
  //   dog.age = -3;
  //   dog.color = "transparent";
  //   dog.save();

  // Variant 3 | Edit with '.findByIdAndUpdate()'
  //    await Dog.findByIdAndUpdate(DOG_ID, { name: "Roshko" });

  // DELETE
  // Variant 1
  //   await Dog.deleteOne({ name: "Lisko" });

  // Variant 2
  //   const DOG_ID = "6513075c36a396eea6dde849";
  //   await Dog.findByIdAndDelete(DOG_ID);

  // console.log(dogs);
}

connectDb();

// // FROM THE DB
// const DB_DOGS = [
//   {
//     _id: "6513077a36a392a6dde84a",
//     name: "Johny",
//     age: 12,
//     color: "white",
//   },
//   {
//     _id: "6513077a36a33eea6dde84a",
//     name: "Roshko",
//     age: 4,
//     color: "black",
//   },
//   {
//     _id: "65130136a396eea6dde84a",
//     name: "Pesho",
//     age: 1,
//     color: "brown",
//   },
// ];

// // THEN WHEN THEY ARE FETCHED, THEY ARE MAPPED WITH THE SCHEMA
// const transformedDbDogs = DB_DOGS.map((dog) => {
//   return {
//     ...dog,
//     getDescription: function () {
//       return `This dog is called ${this.name} !`;
//     },
//   };
// });

// // when all ready
// transformedDbDogs.forEach((dog) => console.log(dog.getDescription()));