import express from "express";
import { getSale } from "../controllers/saleController.js";

const router = express.Router();

router.route("/").get(getSale);

export default router;
