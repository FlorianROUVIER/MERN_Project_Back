require('dotenv').config()
const express = require("express");
let cors = require("cors");

const app = express();

// Connexion
const connectDB = require('./db/conn');


const routerUsers = require('./routes/api/user');
const routerProducts = require('./routes/api/product');
const routerAuth = require('./routes/api/authUser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use((req, res, next)=>
{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

// Connect DB
connectDB();

app.use('/', routerProducts);
app.use('/admin', routerUsers);
app.use('/login', routerAuth);


app.listen(3001, () => {
  console.log("Test ok");
});
