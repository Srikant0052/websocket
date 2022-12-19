const express = require("express");
const router = express.Router();
const { playerRegistration, playerLogin } = require("../controllers/playerController");

router.post("/register", playerRegistration);
router.post("/login", playerLogin);

module.exports = router;
