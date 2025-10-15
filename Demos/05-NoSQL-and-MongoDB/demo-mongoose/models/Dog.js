const mongoose = require("mongoose"); // Here we add Mongoose again

// Schema
const dogSchema = new mongoose.Schema({
  name: {
    required: [true, "Name is required!"], // This is like error message
    type: String,
    minLength: 3,
    maxLength: 30,
  },
  age: Number,
  color: String,
});
// Схемата взима всички записи от колекцията и започва да добавя методи на всеки един запис поотделно.

// Methods
dogSchema.methods.bark = function () {
  console.log(`Dog with name ${this.name} has barked!`);
};
// ^ Like this we add function to out Schema. We CAN'T use arrow functions, because 'this' will loose its context. 'this' refers to the upper object

// Virtual Properties (Calculated Properties)
dogSchema.virtual("description").get(function () {
  return `Dog name: ${this.name}, color: ${this.color}, age: ${this.age}.`;
});
// Virtual properties is not saved in database, but to just det somethig from database.

// Static method
dogSchema.static("getDogsCollection", function (age) {
  return this.find();
});

// Model
const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
// Like this we create the model and export it