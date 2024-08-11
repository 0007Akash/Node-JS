const express = require("express");

const { ProductModel } = require("../modelSchema.js");

const productRouter = express.Router();

productRouter.get("/get-product", async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.json({
      message: "Product data fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(`Error fetching products ${error}`);
  }
});

productRouter.post("/add-product", async (req, res) => {
  try {
    const product = req.body;
    const addData = new ProductModel(product);
    await addData.save();
    res.send("Product added successfully");
  } catch (error) {
    console.log(`Error while adding products ${error}`);
    res.status(400).send("Error adding products");
  }
});

productRouter.patch("/update-products/:productID", async (req, res) => {
  try {
    const productID = req.params.productID;
    const updateProduct = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      updateProduct,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(`Error updating product ${error}`);
    res.status(400).send("Error updating product");
  }
});

productRouter.delete("/delete-product/:productID", async (req, res) => {
  try {
    const productID = req.params.productID;
    const deleteProduct = await ProductModel.findByIdAndDelete(productID);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error deleting product: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = productRouter;
