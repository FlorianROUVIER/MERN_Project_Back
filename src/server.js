require('dotenv').config()
const express = require("express");
let cors = require("cors");

// Routes

const app = express();

// Connexion
const connectDB = require('./db/conn');

const Users = require('./routes/api/user');

app.use(express.json());
app.use(cors());

app.use('/', Users);
app.use('/admin', Users);

// Connect DB
connectDB();


app.listen(3001, () => {
  console.log("Test ok");
});
