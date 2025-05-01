const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hey i am root");
});

// Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
// app.get("/listings/:id", async (req, res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/show.ejs", {listing});
// });

// New Show Route (with error handling)
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.error("Error fetching listing:", err.message);
    res.status(500).send("Something went wrong");
  }
});

// New Create Route
app.post("/listings", async (req, res) => {
  try {
    const data = req.body.listing;

    const newListing = new Listing({
      title: Array.isArray(data.title) ? data.title[0] : data.title,
      description: Array.isArray(data.description)
        ? data.description[0]
        : data.description,
      price: parseFloat(Array.isArray(data.price) ? data.price[0] : data.price),
      location: Array.isArray(data.location) ? data.location[0] : data.location,
      country: Array.isArray(data.country) ? data.country[0] : data.country,
      image: {
        url: Array.isArray(data.image) ? data.image[0] : data.image,
        filename: "placeholder.jpg",
      },
    });

    await newListing.save();
    res.redirect("/listings");
  } catch (e) {
    console.error("Validation error:", e.message);
    res.status(400).send("Validation error: " + e.message);
  }
});

// Create Route
// app.post("/listings", async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
// });

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// app.get("/testlisting", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
