const jwt = require("jsonwebtoken");
const sendResponse = require("../Utils/response");
const { User } = require("../Models/user.model");
const bcrypt = require("bcryptjs");

// Signup Controller
const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log("request comming");

  try {
    if (!name || !email || !password) {
      return sendResponse(res, 402, "All fields are required");
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return sendResponse(res, 403, `This Email:${email} Already exist`);
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedpassword, phone });
    await user.save();
    return sendResponse(res, 201, "User registered successfully", User);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return sendResponse(res, 402, "All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 400, "Invalid credentials");

    const isValledPassword = await bcrypt.compare(password, user.password);
    if (!isValledPassword) return sendResponse(res, 400, "Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECRET === "production",
    });

    sendResponse(res, 200, "Login successful", { token });
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

module.exports = { signup, login };
