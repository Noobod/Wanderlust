require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js"); // Your combined 40+ listings
const User = require("../models/user.js"); // Make sure you have this model

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}

const initDB = async () => {
  // Delete all existing listings
  await Listing.deleteMany({});

  // Get the first user from the database (your existing user)
  const user = await User.findOne();
  if (!user) {
    console.log("No user found! Please create a user first.");
    return;
  }

  // Add owner field to all listings
  const listingsWithOwner = initData.data.map(listing => ({
    ...listing,
    owner: user._id
  }));

  // Insert listings into DB
  await Listing.insertMany(listingsWithOwner);
  console.log("Listings have been initialized with an owner!");
};

main()
  .then(() => initDB())
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err));
