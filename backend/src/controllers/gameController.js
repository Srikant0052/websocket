const gameModel = require("../models/gameModel");
const createError = require("http-errors");
const { socketConnection } = require("../..");

exports.createBet = async (req, res, next) => {
  try {
    const requestBody = req.body;

    const {
      selectedCard,
      blackCardPlayerIdList,
      redCardPlayerIdList,
      roundNumber,
      activePlayerIdList,
      b_bettingPhase,
      b_game_phase,
      b_cashout_phase,
      timeNow,
      roundIdList,
    } = requestBody;

    if (["Black", "Red"].includes(selectedCard) === -1) {
      throw createError(404, `Please Select One Card`);
    }

    const cardBet = await gameModel.create(requestBody);

    return res
      .status(201)
      .send({ status: true, message: "Success", data: cardBet });

  } catch (error) {
    next(error);
  }
};
