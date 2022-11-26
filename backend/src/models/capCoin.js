const mongoose = require("mongoose");

const capCoinSchema = new mongoose.Schema(
  {
    rank: {
      type: String,
      default: null,
    },
    coinName: {
      type: String,
      default: null,
    },
    symbol: {
      type: String,
      default: null,
    },
    priceUsd: {
      type: String,
      default: null,
    },

    volumeUsd24Hr: {
      type: String,
      default: null,
    },
    supply: {
      type: String,
      default: null,
    },
    maxSupply: {
      type: String,
      default: null,
    },
    
    marketCapUsd: {
      type: String,
      default: null,
    },
    changePercent24Hr: {
      type: Number,
      default: null,
    },

    explorer: {
      type: String,
      default: null,
    },

    vwap24Hr: {
      type: String,
      default: null,
    },

    time: {
      type: String,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("capCoin100", capCoinSchema);
