const express = require("express");
const router = express.Router();
const { createBet } = require("../controllers/gameController");

router.post("/game", createBet);

module.exports = router;
