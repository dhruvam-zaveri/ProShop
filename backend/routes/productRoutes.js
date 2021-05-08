import express from "express";
import {
  getProducts,
  getProductWithId,
  deleteProductWithId,
  updateProduct,
  createProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// You can create chainable route handlers for a route path by using app.route().Because the path is specified at a
// single location, creating modular routes is helpful, as is reducing redundancy and typos.

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductWithId)
  .delete(protect, admin, deleteProductWithId)
  .put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, createProductReview);
export default router;
