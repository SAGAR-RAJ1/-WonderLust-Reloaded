//todo ------> Added data initilisation code from data.js step 5 : Add listing routes in app.js
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//connect to Data Base
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  //delete any data that is available before
  await Listing.deleteMany({});
  // const ownerId =new mongoose.Types.ObjectId("68749a59c9b33c079cf76f9d"); // ✅ Correct ID
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "68749a59c9b33c079cf76f9d" }));
                          //initi data object hai uska data wala value le rhe
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();