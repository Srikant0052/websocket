const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const playerModel = require("../models/playerModel");
const { isValid, isValidRequestBody } = require("../utils/validator");

const playerRegistration = async (req, res, next) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`);
    }

    const { email, userName, password, balance, betAmount } = requestBody;

    const isPlayerExist = await playerModel.findOne({
      username: userName,
    });

    if (isPlayerExist) {
      throw createError(400, `Player is Already Registered`);
    }

    if (!isValid(email)) {
      throw createError(400, `Please Enter Email`);
    }

    const isEmailExists = await playerModel.findOne({
      email: email,
    });

    if (isEmailExists) {
      throw createError(400, `Email is Already In Use`);
    }

    if (!isValid(password)) {
      throw createError(400, `Please Enter Password`);
    }

    const playerData = {
      email,
      username: userName,
      password,
      email,
      balance,
      betAmount,
    };

    const player = await playerModel.create(playerData);

    return res.status(201).send({
      status: true,
      message: "Registered Successfully!",
      data: player,
    });
  } catch (error) {
    next(error);
  }
};

const playerLogin = async (req, res, next) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`);
    }

    const { email, password } = requestBody;

    if (!isValid(email)) {
      throw createError(400, `Please Enter Email`);
    }

    if (!isValid(password)) {
      throw createError(400, `Please Enter Password`);
    }

    const player = await playerModel
      .findOne({
        email: email,
        password: password,
      })
      .lean();

    if (!player) {
      throw createError(401, `Email or Password is Incorrect!`);
    }

    const token = jwt.sign(
      {
        userId: player._id,
        role: player.role,
      },
      "Player@28",
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      status: true,
      message: "Login Successfully",
      token: token,
      data: player,
    });
  } catch (error) {
    next(error);
  }
};

const afterBetUpdatePlayer = async (req, res, next) => {
  try {
    const requestBody = req.body;

    const { playerId, balance, betAmount, payout_multiplier } = requestBody;

    const player = await playerModel.findById({ _id: playerId });

    if (!player) {
      throw createError(400, `Data not found!`);
    }

    // if (betAmount) {
    // }
    // const updateData = {};

    const updatePlayerData = await playerModel.findOneAndUpdate(
      { _id: playerId },
      { $set: { $inc: { balance: -betAmount } } },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Success", data: updatePlayerData });
  } catch (error) {
    next(error);
  }
};

module.exports = { playerRegistration, playerLogin, afterBetUpdatePlayer };
