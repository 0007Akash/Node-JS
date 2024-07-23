// Importing necessary modules
const express = require("express");
const fs = require("fs");

// Setting the port number
const PORT = 8080;

// Initializing the Express server
const server = express();

// Middleware to parse JSON bodies
server.use(express.json());

/**
 * GET /getTodos
 * Reads the todos data from the db.json file and sends it as a response
 */
server.get("/getTodos", (req, res) => {
  // Read the data from db.json
  const todoData = fs.readFileSync("./db.json", "utf-8");
  // Parse the JSON data
  const parsedData = JSON.parse(todoData);
  // Send the parsed data as the response
  res.send(parsedData);
});

/**
 * POST /addTodo
 * Adds a new todo item to the db.json file
 */
server.post("/addTodo", (req, res) => {
  // Get the new todo data from the request body
  const data = req.body;
  console.log(data);
  // Read the existing data from db.json
  const userData = fs.readFileSync("./db.json", "utf-8");
  console.log(userData);
  // Parse the existing data
  const newParsedData = JSON.parse(userData);
  console.log(newParsedData);
  // Add the new todo to the todos array
  newParsedData.todos.push(data);
  // Write the updated data back to db.json
  fs.writeFileSync("./db.json", JSON.stringify(newParsedData));
  // Send a response indicating success
  res.send(`Data received for now ${newParsedData}`);
});

/**
 * PATCH /todos/even-status
 * Updates the status of todos with even IDs from false to true
 */
server.patch("/todos/even-status", (req, res) => {
  // Read the data from db.json
  const data = fs.readFileSync("./db.json", "utf-8");
  // Parse the JSON data
  const parseData = JSON.parse(data);
  console.log(parseData.todos);
  // Iterate through the todos and update the status of even ID todos
  parseData.todos.forEach((item, idx) => {
    if (item.id % 2 === 0 && item.status === false) {
      item.status = true;
    }
  });
  // Write the updated data back to db.json
  fs.writeFileSync("./db.json", JSON.stringify(parseData));
  // Send a response indicating success
  res.send(`Todos updated successfully`);
});

/**
 * DELETE /todos
 * Deletes todos with status set to true from the db.json file
 */
server.delete("/todos", (req, res) => {
  // Read the data from db.json
  const data = fs.readFileSync("./db.json", "utf-8");
  // Parse the JSON data
  const parseData = JSON.parse(data);
  // Filter out todos with status true
  parseData.todos = parseData.todos.filter((todo) => todo.status === false);
  console.log(parseData);
  // Write the updated data back to db.json
  fs.writeFileSync("./db.json", JSON.stringify(parseData));
  // Send a response indicating success
  res.send("Data from todos deleted successfully");
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
