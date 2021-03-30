import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc   Fetch all the products
//@route  Get /api/products
//@access public
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc   Fetch a single product
//@route  Get /api/products/:id
//@access public
const getProductWithId = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductWithId };
