const express = require("express");
require("dotenv").config();
const Movie = require("./modelSchema.js");
const movieRouter = require("./route/movie.route.js");

const connection = require("./db.js");

const server = express();
server.use(express.json());
server.use("/movieStore", movieRouter);

const PORT = process.env.PORT || 4001;
server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error connecting to database ${error}`);
  }
  console.log(`Server is running on port ${PORT}`);
});
