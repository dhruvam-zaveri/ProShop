import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//@desc   Fetch all the products
//@route  POST /api/users/login
//@access private
router.post("/login", authUser);

//@desc   Returns logged in user's profile
//@route  GET /api/users/profile
//@access private
router.route("/profile").get(protect, getUserProfile);

export default router;
