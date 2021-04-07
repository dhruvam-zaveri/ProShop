import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//@desc   Create user
//@route  POST /api/users/
//@access public
router.route("/").post(registerUser);

//@desc   Fetch all the products
//@route  POST /api/users/login
//@access public
router.post("/login", authUser);

//@desc   Returns logged in user's profile
//@route  GET /api/users/profile
//@access private
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
