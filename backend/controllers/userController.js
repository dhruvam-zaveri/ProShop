import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

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
      token: null,
    });
  } else {
    // 401 means Unauthorized
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { authUser };
