const express = require("express");
const app = express();

let cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1> Page d'accueil </h1>");
});



app.listen(3001, () => {
  console.log("Test ok");
});
