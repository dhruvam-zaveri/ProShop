const express = require("express"); //CommonJS expression; different from ES6 JS
const products = require("./data/products.js");

const app = express(); // initialize express

// Creating routes
app.get("/", (req, res) => {
  // Route to main page
  res.send("API is running!!");
});

app.get("/api/product", (req, res) => {
  // Route for all product request
  // The products we have currently are not exacptly in JSON format but res.json() will convert them to JSON format
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  // Route for specific product request
  // We will use placeholder here to filter out the product that is requested
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log("Server running on port 5000"));
