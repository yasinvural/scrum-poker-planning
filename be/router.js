const express = require("express");
const router = express.Router();
const { addPlan, getPlan } = require("./planning");

router.get("/", (req, res) => {
  res.status(200).send("Hello Node.js !!");
});

router.get("/get-plan", (req, res) => {
  const { sessionName } = req.query;
  const { error, existingPlan } = getPlan(sessionName);
  if (error) {
    res.status(400).send(error);
  } else {
    res.status(200).send(existingPlan);
  }
});

router.post("/save-plan", (req, res) => {
  const { error, sessionName } = addPlan(req.body);

  if (error) {
    res.status(400).send(error);
  } else {
    res.status(201).send(sessionName);
  }
});

module.exports = router;
