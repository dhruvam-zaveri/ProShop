import express from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // initialize express

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Creating routes
// This will allow us to accept JSON data in body
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// when we are ready we will hit this route and fetch the client ID
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// making uploads folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// To deal with 404 errors; if any route other than specified is tried to access
app.use(notFound);

// definig our own error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
