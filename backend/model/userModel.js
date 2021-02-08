import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // We can also define fields like:
    // fieldName: typeOfField
    // But we want to add extra properties besides of type, so we will be using object instead
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Can also add createdAt and updatedAt fields but that can be done automatically by mongoose by passing another parameter in
    // this function, this parameter being an object.
  },
  {
    timeStamps: true,
  }
);

// We want to create a model out of this schema thats why we are using mongoose.model() method
const User = mongoose.model("User", userSchema);

export const User;
