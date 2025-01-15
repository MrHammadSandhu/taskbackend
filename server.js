require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectdb = require("./DB/db");
const userrouter = require("./Routes/user.route");

const app = express();
const port = process.env.PORT || 8080;

// Connect to the database
connectdb();

// CORS configuration

app.use(
  cors({
    origin: "*",
  })
);

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// Test route for verifying CORS
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Main routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", userrouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
