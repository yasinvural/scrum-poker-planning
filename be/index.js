const express = require("express");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello  Node.js!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
