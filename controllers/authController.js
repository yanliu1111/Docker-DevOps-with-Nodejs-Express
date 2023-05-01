import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
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

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("user not found!!!!!!!");
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
        message: "User logged in successfully",
      });
    } else {
      console.log("incorrect!!!!!!!");
      res.status(400).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }
  } catch (e) {
    console.log("Looooooook", e);
    res.status(400).json({
      status: "fail",
    });
  }
};

export default { signUp, login };
