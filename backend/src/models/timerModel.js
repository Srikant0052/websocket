const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: function () {
        new Date();
      },
    },
    countDown: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("timer", timerSchema);
