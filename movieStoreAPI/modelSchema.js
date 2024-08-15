const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: String,
  year: Number,
  genre: String,
  director: String,
  rating: Number,
  price: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
