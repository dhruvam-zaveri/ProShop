import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
