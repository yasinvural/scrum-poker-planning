const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello Node.js !!");
});

router.post("/save-planning", (req, res) => {
  res.status(201).send(req.body);
});

module.exports = router;
