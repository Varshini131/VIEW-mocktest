const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

router.post("/", async (req, res) => {
  const doc = await Registration.create(req.body);
  res.status(201).json(doc);
});

module.exports = router;