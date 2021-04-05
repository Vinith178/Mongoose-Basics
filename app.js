const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please name the fruit"]
  },
  rating: {
    type:Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 6,
  review: "Tastes good"
});

//fruit.save();

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person",peopleSchema);

const pineapple = new Fruit{
  name:"Pineapple",
  rating: 9,
  review: "Tastes good with pepper and salt"
}

pineapple.save();



const person = new Person({
  name: "Vinith",
  age: 19,
  favouriteFruit: pineapple
});


person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 4,
  review: "Tastes bad"
});

const orange = new Fruit({
  name: "Orange",
  rating: 7,
  review: "Nice taste when made into a juice"
});

const banana = new Fruit({
  name: "Banana",
  rating: 8,
  review: "Eat when bored"
});

Fruit.insertMany([kiwi,orange,banana],function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Succesfully inserted");
  }
});

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  } else {
    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    }) ;
  }
});

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};

Fruit.updateOne({_id:"606b3788ca399d685cba7ebf"},{name: "Peach"},function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Successfully updated the document");
  }
});


Fruit.deleteOne({name: "Peach"},function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Succesfully deleted");
  }
});

Person.deleteMany(name: "Vinith", function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Deleted all documents");
  }
})
