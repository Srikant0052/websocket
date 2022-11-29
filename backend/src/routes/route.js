const express = require("express");
const router = express.Router();

const {
  bitstampFunction,
  getBitstampAllPair,
} = require("../controllers/bitstamp");
const { capCoin100Coins, getCoinPairing } = require("../controllers/capCoin");

router.post("/bitstampApi", bitstampFunction);
router.get("/pairBitstamp", getBitstampAllPair);
router.post("/cap100Coin", capCoin100Coins);
router.get("/getCoinPair/:symbol", getCoinPairing);

module.exports = router;
