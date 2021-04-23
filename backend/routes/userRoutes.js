import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//@desc   Create user
//@route  POST /api/users/
//@access public
router.route("/").post(registerUser).get(protect, admin, getUsers);

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
