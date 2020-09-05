const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

app.get("/", (req, res) => {
  res.status(200).send("Hello Node.js !!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
