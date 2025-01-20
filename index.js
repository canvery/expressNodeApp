const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Sticky Notes API is running!" });
});

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://user-222:canCode01222@expressnodedb.61zaz.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // Exit if the database connection fails
  });

// Routes
const loginRoute = require("./API/Login");
const notesRoute = require("./API/Notes");

app.use("/login", loginRoute); // Login-related routes
app.use("/notes", notesRoute); // Notes-related routes

/* // Start the server locally
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); */

// Start the server Microsoft Azure
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});