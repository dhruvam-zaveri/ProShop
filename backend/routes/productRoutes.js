import express from "express";
import {
  getProducts,
  getProductWithId,
} from "../controllers/productController.js";

const router = express.Router();

// You can create chainable route handlers for a route path by using app.route().Because the path is specified at a
// single location, creating modular routes is helpful, as is reducing redundancy and typos.

//@desc   Fetch all the products
//@route  GET /api/products
//@access public
router.route("/").get(getProducts);

//@desc   Fetch single product
//@route  GET /api/products/:id
//@access public
router.route("/:id").get(getProductWithId);

export default router;
