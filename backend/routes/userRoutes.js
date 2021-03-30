import express from "express";
import { authUser } from "../controllers/userController.js";

const router = express.Router();

//@desc   Fetch all the products
//@route  Get /api/products
//@access public
router.post("/login", authUser);

export default router;
