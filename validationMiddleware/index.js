const express = require("express"); // Importing the Express
const fs = require("fs"); // Importing the file system module
const PORT = 3001; // Defining the port number
const server = express(); // Creating an Express server

server.use(express.json()); // Middleware to parse JSON bodies in requests

// Middleware to validate data types in the request body
const validateDataTypes = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body; // Destructuring properties from the request body
  let error = []; // Array to store validation error messages

  // Validate each field and push an error message if the validation fails
  if (typeof ID !== "number") {
    error.push("ID must be a number");
  }
  if (typeof Name !== "string") {
    error.push("Name must be a string");
  }
  if (typeof Rating !== "number") {
    error.push("Rating must be a number");
  }
  if (typeof Description !== "string") {
    error.push("Description must be a string");
  }
  if (typeof Genre !== "string") {
    error.push("Genre must be a string");
  }
  if (!Array.isArray(Cast)) {
    error.push("Cast must be an array");
  } else if (!Cast.every((item) => typeof item === "string")) {
    error.push("Cast array must only contain strings");
  }

  // If there are validation errors, write them to res.txt and send a 400 response
  if (error.length > 0) {
    fs.appendFile(
      "res.txt",
      `Validation error: ${error.join(" ")}\n`,
      (err) => {
        if (err) {
          console.log("Failed to write to res.txt", err);
        }
      }
    );
    res
      .status(400) // Set HTTP status code to 400 for bad request
      .json({ message: "bad request. some data is incorrect.", error }); // Send error messages as JSON response
  } else {
    next(); // If no errors, proceed to the next middleware or route handler
  }
};

server.use(validateDataTypes); // Use the validation middleware for all routes

// Route handler for POST requests to "/"
server.post("/", (req, res) => {
  res.status(200).json({ message: "Data Received" }); // Send a success message with status 200
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
