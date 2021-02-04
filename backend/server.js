import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express(); // initialize express

// Creating routes
app.get("/", (req, res) => {
  // Route to main page
  res.send("API is running!!");
});

app.get("/api/products", (req, res) => {
  // Route for all product request
  // The products we have currently are not exacptly in JSON format but res.json() will convert them to JSON format
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  // Route for specific product request
  // We will use placeholder here to filter out the product that is requested
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
