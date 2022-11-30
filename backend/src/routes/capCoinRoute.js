const express = require("express");
const router = express.Router();
const { capCoin100Coins, getCoinPairing } = require("../controllers/capCoin");

router.post("/cap100Coin", capCoin100Coins);
router.get("/getCoinPair/:symbol", getCoinPairing);

module.exports = router;
