const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.static('public'))

const http = require('http');
const server = http.createServer(app);

// Middleware

app.use(
  cors({
    origin: ["https://valdecanasapi.azurewebsites.net", "http://localhost:5000"],
  })
);


app.use(express.json());


const loginRoute = require("./API/Login");
const notesRoute = require("./API/Notes");



// Test route
app.get('/', (req, res)=> {
  res.send("server is running")
})

const mongodb = "mongodb+srv://user-222:canCode01222@expressnodedb.61zaz.mongodb.net/";


// Connect to MongoDB
mongoose
  .connect(mongodb, {
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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});