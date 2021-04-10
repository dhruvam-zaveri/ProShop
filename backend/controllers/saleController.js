import expressAsyncHandler from "express-async-handler";
import Sale from "../models/saleModel.js";

//@desc   Fetch all the sales
//@route  GET /api/sale
//@access public
export const getSale = expressAsyncHandler(async (req, res) => {
  const sale = await Sale.find({});
  res.json(sale);
});
