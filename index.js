require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const connectdb = require("./DB/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userrouter = require("./Routes/user.route");
connectdb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", userrouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
