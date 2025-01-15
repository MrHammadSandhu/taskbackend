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
const corsOptions = {
  origin: "https://taskfrontend-tau.vercel.app/", // Replace with your deployed frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Allow cookies
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight

// Use CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests globally

// Middleware to ensure headers are added for all requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

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
