const express = require("express");
const router = express.Router();
const { createPlan, getPlanBySessionName } = require("./planning");

router.get("/", (req, res) => {
  res.status(200).send("Hello Node.js !!");
});

router.get("/get-plan", (req, res) => {
  const { sessionName } = req.query;
  const { error, existingPlan } = getPlanBySessionName(sessionName);
  if (error) {
    res.status(400).send(error);
  } else {
    res.status(200).send(existingPlan);
  }
});

router.post("/create-plan", (req, res) => {
  const { error, sessionName } = createPlan(req.body);

  if (error) {
    res.status(400).send(error);
  } else {
    res.status(201).send(sessionName);
  }
});

module.exports = router;
