const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    card: {
      type: String,
      trim: true,
      required: true,
    },
    cardId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("playingCard", cardSchema);
