const {
  signup,
  login,
  getUserData,
} = require("../Controllers/user.controller");
const express = require("express");

const userrouter = express.Router();

userrouter.post("/signup", signup);
userrouter.post("/login", login);
userrouter.get("/getuser", getUserData);

module.exports = userrouter;
