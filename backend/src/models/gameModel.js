const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    playingCard: {
      type: String,
      // required: true,
    },

    selectedCard: {
      type: String,
      enum: ["Black", "Red"],
      // required: true,
    },

    blackCardPlayerIdList: {
      type: [String],
      default: [],
    },

    redCardPlayerIdList: {
      type: [String],
      default: [],
    },

    roundNumber: {
      type: Number,
      default: 1,
    },

    activePlayerIdList: {
      type: [String],
      default: [],
    },

    //   multiplierCrash: {
    //     type: Number,
    //     default: 0,
    //   },

    b_bettingPhase: {
      type: Boolean,
      default: false,
    },

    b_game_phase: {
      type: Boolean,
      default: false,
    },

    b_cashout_phase: {
      type: Boolean,
      default: false,
    },

    timeNow: {
      type: Number,
      default: -1,
    },

    //   previousCrashes: {
    //     type: [Number],
    //     default: [],
    //   },

    roundIdList: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
