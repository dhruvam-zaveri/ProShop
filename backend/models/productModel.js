import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // we want to refrence a specific model for the ObjectId in type field, this will add a relationship between user and product
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timeStamps: true }
);

const productSchema = mongoose.Schema(
  {
    // Products will only be created by admin and user filed in this schema will store which admin created the product as there
    // can be more than one admin
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // we want to refrence a specific model for the ObjectId in type field, this will add a relationship between user and product
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    // Reviews are going to be an array of review objects, so we are going to have a seperate schema for that called reviewSchema
    // reviewSchema is small and this is the only place we are goung to use it so we will define it here only
    reviews: [reviewSchema],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
