require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const connectdb = require("./DB/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userrouter = require("./Routes/user.route");
connectdb();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins or restrict to specific domains
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Configure CORS
const corsOptions = {
  origin: ["*", "https://www.gulfhorizontele.com", "http://127.0.0.1:5500"], // Add local testing and production domains
  methods: ["GET", "POST", "OPTIONS"], // Include OPTIONS for preflight requests
};
app.use(cors(corsOptions)); // Enable CORS
app.options("*", cors(corsOptions)); // Handle preflight requests globally
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", userrouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
