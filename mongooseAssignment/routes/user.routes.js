const express = require("express");

const { UserModel } = require("../modelSchema.js");

const userRouter = express.Router();

userRouter.get(`/get-user`, async (req, res) => {
  try {
    const data = await UserModel.find();

    // data.forEach((item) => {
    //   console.log(item.name);
    // });
    res.json({
      message: "User data fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(`error while fetching user data ${error}`);
  }
});

userRouter.post("/create-user", async (req, res) => {
  try {
    const data = req.body;
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new UserModel(data);
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.log(`error while creating user ${error}`);
  }
});

userRouter.patch("/user-update/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    // console.log(userID);
    const updateData = req.body;
    // console.log(updateData);
    const updatedUser = await UserModel.findByIdAndUpdate(userID, updateData, {
      new: true,
    });
    // console.log(updatedUser);
    if (!updatedUser) {
      return res.status(400).send("User not found");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error updating user ${error}`);
    res.status(500).send("Error updating user");
  }
});

userRouter.delete("/delete-user/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deleteUser = await UserModel.findByIdAndDelete(userID);
    if (!deleteUser) {
      return res.status(500).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.log(`Error deleting user ${error}`);
    res.status(500).send("Error deleting user");
  }
});

module.exports = userRouter;
