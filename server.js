require('dotenv').config()
const express = require("express");
let cors = require("cors");

const app = express();

const connectDB = require('./db/conn');

app.use(express.json());
app.use(cors());

// Connect DB
connectDB()

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1> Page d'accueil </h1>");
});



app.listen(3001, () => {
  console.log("Test ok");
});
