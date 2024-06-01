const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const authRoute = require("./routes/authRoutes");
const db = require("./db");
const blogRoute = require("./routes/blogRoutes");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Health check route
app.get("/", (req, res) => {
  res.send("Server is healthy...");
});

// Use routes
app.use("/auth", authRoute);
app.use("/user", blogRoute);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
