const { signup, login } = require("../Controllers/user.controller");
const express = require("express");

const userrouter = express.Router();

userrouter.post("/signup", signup);
userrouter.post("/login", login);

module.exports = userrouter;
