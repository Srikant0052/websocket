let axios = require("axios");
const capCoin = require("../models/capCoin");

const capCoin100Coins = async function (req, res) {
  try {
    const reaquestBody = req.body;

    // const {
    //   rank,
    //   coinName,
    //   symbol,
    //   priceUsd,
    //   volumeUsd24Hr,
    //   supply,
    //   maxSupply,
    //   marketCapUsd,
    //   changePercent24Hr,
    //   vwap24Hr,
    // } = reaquestBody;

    let capCoinApiInDb = await capCoin.insertMany(reaquestBody);
    // console.log(reaquestBody);

    return res
      .status(201)
      .send({ status: true, message: "Successful", data: capCoinApiInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { capCoin100Coins };
