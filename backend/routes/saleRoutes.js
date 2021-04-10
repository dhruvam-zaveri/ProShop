import express from "express";
import { getSale } from "../controllers/saleController.js";

const router = express.Router();

//@desc   Fetch all the sale
//@route  GET /api/sale
//@access public
router.route("/").get(getSale);

export default router;
