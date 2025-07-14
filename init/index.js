const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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
  await Listing.deleteMany({});
  // const ownerId =new mongoose.Types.ObjectId("68749a59c9b33c079cf76f9d"); // ✅ Correct ID
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "68749a59c9b33c079cf76f9d" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();