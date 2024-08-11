const express = require("express");
const connection = require("./db.js");
const { UserModel, ProductModel } = require("./modelSchema.js");
const userRouter = require("./routes/user.routes.js");
const productRouter = require("./routes/product.routes.js");

const server = express();
const PORT = 3005;
server.use(express.json());
server.use("/users", userRouter);
server.use("/products", productRouter);

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error connecting to database ${error}`);
  }

  console.log(`Server is running on port ${PORT}`);
});
