// Get the command line arguments
const argvs = process.argv;
const argv = argvs.slice(2);
const fs = require("fs");
const path = require("path");

// The operation to perform (read, append, create, delete, rename, list)
const operation = argv[0];

if (operation === "read") {
  // Read a file
  const fileToBeRead = argv[1];

  // Read the file synchronously and output its contents
  const fileData = fs.readFileSync(fileToBeRead, "utf-8");
  console.log(fileData);
} else if (operation === "append") {
  // Append content to a file
  const content = argv[1];
  const fileToBeUpdated = argv[2];

  // Append content to the file synchronously
  fs.appendFileSync(fileToBeUpdated, `\n${content}`, "utf-8");
  console.log(`Content appended to the file ${fileToBeUpdated}`);
} else if (operation === "create") {
  // Create a new file
  const fileToBeCreated = argv[1];

  // Open (and create if it doesn't exist) the file asynchronously
  fs.open(fileToBeCreated, "w", function (err, file) {
    if (err) throw err;
    console.log(`File ${fileToBeCreated} created`);
  });
} else if (operation === "delete") {
  // Delete a file
  const fileToBeDeleted = argv[1];

  // Delete the file synchronously
  fs.unlinkSync(fileToBeDeleted);
  console.log(`File ${fileToBeDeleted} deleted successfully`);
} else if (operation === "rename") {
  // Rename a file
  const prevFileName = argv[1];
  const newFileName = argv[2];

  // Rename the file asynchronously
  fs.rename(prevFileName, newFileName, function (err) {
    if (err) throw err;
    console.log(`File ${prevFileName} renamed to ${newFileName}`);
  });
} else if (operation === "list") {
  // List all files in the current directory
  const directoryPath = __dirname;

  try {
    // Read the contents of the directory synchronously
    const files = fs.readdirSync(directoryPath);
    console.log("Files in the directory:", files);
  } catch (err) {
    console.error("Error reading directory:", err);
  }
} else {
  console.log("Invalid Operation.");
}
