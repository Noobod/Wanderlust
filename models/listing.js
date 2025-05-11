const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const imageSchema = new Schema({
  filename: {
    type: String,
  },
  url: {
    type: String,
    default:
      "https://unsplash.com/photos/the-lion-roars-fiercely-with-visible-teeth-BnHb566EPDo",
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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// For delete listing
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
