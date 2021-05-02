import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc   Auth users and get token
//@route  POST /api/users/login
//@access public
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  // to check if the user exists in our DB and also the entered password is correct or not
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    // 401 means Unauthorized
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc   Create new user
//@route  POST /api/users
//@access public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // .create() method creates a new doocument in DB
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // 200 means something was created
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc   Returns logged in user's profile
//@route  GET /api/users/profile
//@access private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc   Updates logged in user's profile
//@route  PUT /api/users/profile
//@access private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    // .save() method will call the DB and change/modify the values for a given user
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc   Get all users
//@route  GET /api/users
//@access private/admin
const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc   Delete a user with ID
//@route  DELETE /api/users/:id
//@access private/admin
const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc   Get user by ID
//@route  GET /api/users/:id
//@access private/admin
const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc   Update q user's profile
//@route  PUT /api/users/:id
//@access private admin
const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
