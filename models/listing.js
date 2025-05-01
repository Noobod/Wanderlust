const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: {
    type: String,
  },
  url: {
    type: String,
    default: "https://unsplash.com/photos/the-lion-roars-fiercely-with-visible-teeth-BnHb566EPDo",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/the-lion-roars-fiercely-with-visible-teeth-BnHb566EPDo"
        : v,
  },
});

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: imageSchema,
  price: Number,
  location: String,
  country: String,
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
