import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected to ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold.underline);
    process.exit(1);
  }
};

export default connectDB;
