require('dotenv').config()
const express = require("express");
let cors = require("cors");

// Routes

const app = express();

// Connexion
const connectDB = require('./db/conn');

const routerUsers = require('./routes/api/user');
const routerProducts = require('./routes/api/product');


app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

app.use('/', routerProducts);
app.use('/admin', routerUsers);
app.use('/login', routerUsers);


app.listen(3001, () => {
  console.log("Test ok");
});
