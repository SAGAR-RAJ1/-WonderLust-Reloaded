const express = require('express');
const app = express();
const path = require('path');
const Listing = require("./models/listing.js")





app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views",path.join(__dirname, "views"));


//connection with the mongodb server using mongoose
const mongoose = require('mongoose');
const { title } = require('process');

main()
  .then(() => {
    console.log("connection Successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}




app.get('/', function(req, res) {
    res.send("welcome");
});

app.get('/tes',async function(req, res) {
     let sample = new Listing({
        title : "My Home Town house",
        description: "Very good house vary vary good house",
        location:"gaya,bihar",
        price:40000000,
        country:"India"
     })
    await sample.save();
    console.log("Data uploadedd");
    res.send("Sucess")
});
app.listen(3000);