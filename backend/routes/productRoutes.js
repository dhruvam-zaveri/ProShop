import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    // Route for all product request
    // The products we have currently are not exacptly in JSON format but res.json() will convert them to JSON format
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    // Route for specific product request
    // We will use placeholder here to filter out the product that is requested
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
