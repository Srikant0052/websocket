const express = require("express");
const router = express.Router();
const { time, timeSecond } = require("../controllers/timerController");

router.post("/countdown", time);
router.get("/st", timeSecond);

module.exports = router;
