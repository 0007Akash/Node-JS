const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Symbols to represent folders and files
const folderIcon = "&#128194;"; // 📁
const fileIcon = "&#128196;"; // 📄

const server = http.createServer((request, response) => {
  // Build the complete path to the file or directory based on the URL
  const resolvedPath = path.join(__dirname, request.url || "/");

  // Check if the path points to a file or a folder
  fs.stat(resolvedPath, (error, stats) => {
    if (error) {
      // If there's a problem finding the file or folder, show a "Not Found" message
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>404 Not Found</h1>");
      return;
    }

    if (stats.isDirectory()) {
      // If it's a folder, get a list of items inside it
      fs.readdir(resolvedPath, (error, items) => {
        if (error) {
          // If there's a problem reading the folder, show an error message
          response.writeHead(500, { "Content-Type": "text/html" });
          response.end("<h1>500 Internal Server Error</h1>");
          return;
        }

        // Show a list of items in the folder as HTML
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("<ul>");

        items.forEach((item) => {
          // Create a link for each item in the folder
          const itemPath = path.join(request.url || "/", item);
          console.log("Resolved Path:", itemPath);

          // Check if each item is a folder or a file and add the right icon
          if (fs.statSync(path.join(resolvedPath, item)).isDirectory()) {
            response.write(
              `<li>${folderIcon} <a href="${itemPath}">${item}</a></li>`
            );
          } else {
            response.write(
              `<li>${fileIcon} <a href="${itemPath}">${item}</a></li>`
            );
          }
        });

        response.write("</ul>");
        response.end();
      });
    } else {
      // If it's a file, read and show its contents
      fs.readFile(resolvedPath, (error, fileData) => {
        if (error) {
          // If there's a problem reading the file, show an error message
          response.writeHead(500, { "Content-Type": "text/html" });
          response.end("<h1>500 Internal Server Error</h1>");
          return;
        }

        // Show the contents of the file to the user
        response.writeHead(200);
        response.end(fileData);
      });
    }
  });
});

// Start the server and let it listen for incoming requests
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
