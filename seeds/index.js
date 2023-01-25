const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "63d040de383e6232ef3b1480",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/diweqcalq/image/upload/v1674676982/YelpCamp/j0z3zwbc2klv2pt0crrm.jpg",
          filename: "YelpCamp/j0z3zwbc2klv2pt0crrm",
        },
        {
          url: "https://res.cloudinary.com/diweqcalq/image/upload/v1674676982/YelpCamp/pwkvp5mhvm5sdmsie2a0.jpg",
          filename: "YelpCamp/pwkvp5mhvm5sdmsie2a0",
        },
        {
          url: "https://res.cloudinary.com/diweqcalq/image/upload/v1674676983/YelpCamp/lfb4pfrlvus4afr3ofzz.jpg",
          filename: "YelpCamp/lfb4pfrlvus4afr3ofzz",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, id nemo reiciendis quos nesciunt obcaecati cum iure eius fugiat dolore adipisci! Eaque placeat velit repellendus?",
      price,
    });
    await camp.save();
  }
};

seedDB();
