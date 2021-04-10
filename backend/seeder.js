import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import sales from "./data/sale.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Sale from "./models/saleModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    const sale = await Sale.insertMany(sales);

    console.log("Data imported!!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Sale.deleteMany();

    console.log("Data deleted!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
