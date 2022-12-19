const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    balance: {
      type: Number,
      default: 1000,
    },

    betAmount: {
      type: Number,
      default: 0,
    },

    payout_multiplier: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
