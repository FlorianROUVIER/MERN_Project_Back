require('dotenv').config()
const express = require("express");
let cors = require("cors");

// Routes

const app = express();

// Connexion
const connectDB = require('./db/conn');

const Users = require('./routes/api/user');
const Products = require('./routes/api/product');


app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

app.use('/', Products);
app.use('/admin', Users);

app.listen(3001, () => {
  console.log("Test ok");
});
