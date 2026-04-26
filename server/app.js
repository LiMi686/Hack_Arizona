const express = require("express");
require("dotenv").config();
require("./db");

const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("Serving on port 8080");
});
