const express = require("express");
const Movie = require("../modelSchema.js");
const movieRouter = express.Router();

movieRouter.get("/get-movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res
      .status(200)
      .json({ message: "Movies fetched successfully", data: movies });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

movieRouter.get("/movies", async (req, res) => {
  try {
    const {
      title,
      rating,
      q,
      sortBy,
      order = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (title) {
      query.title = title;
    }
    if (rating) {
      query.rating = rating;
    }
    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    const sortOptions = {};

    if (sortBy) {
      if (order === "asc") {
        sortOptions[sortBy] = 1;
      } else {
        sortOptions[sortBy] = -1;
      }
    }

    const movies = await Movie.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res
      .status(200)
      .json({ message: "Movies fetched successfully", movies: movies });
  } catch (error) {
    console.log(`Error occurred while fetching movies`);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

movieRouter.post("/add-movie", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.log(`Error adding movies ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
});

movieRouter.patch("/update-movie/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(updatedMovie);
  } catch (error) {
    console.log(`Error while updating movie`);
    res.status(500).json({ message: "Something went wrong" });
  }
});

movieRouter.delete("/delete-movie/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ deletedMovie: deletedMovie });
  } catch (error) {
    console.log(`Error while deleting movie`);
    res.status(500).json({ message: "Something went wrong", error: error });
  }
});

module.exports = movieRouter;
