import express from "express";
import {
  getProducts,
  getProductWithId,
} from "../controllers/productController.js";

const router = express.Router();

//@desc   Fetch all the products
//@route  Get /api/products
//@access public
router.route("/").get(getProducts);

//@desc   Fetch single product
//@route  Get /api/products/:id
//@access public
router.route("/:id").get(getProductWithId);

export default router;
