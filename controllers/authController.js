import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
    });
  }
};

export default signUp;
