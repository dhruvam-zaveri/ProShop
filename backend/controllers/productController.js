import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc   Fetch all the products
//@route  GET /api/products
//@access public
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc   Fetch a single product
//@route  GET /api/products/:id
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

//@desc   Delete a single product
//@route  DELETE /api/products/:id
//@access Protected/Admin
const deleteProductWithId = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.remove();
    res.json({message: 'Product deleted'});
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductWithId, deleteProductWithId };
