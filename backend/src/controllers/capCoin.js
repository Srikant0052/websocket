let axios = require("axios");
const capCoin = require("../models/capCoin");

const capCoin100Coins = async function (req, res) {
  try {
    const options = {
      method: "get",
      url: "https://api.coincap.io/v2/assets",
    };

    const response = await axios(options);
    // console.log(response.data.data);
    const result = response.data.data;

    let capCoinApiData = [];

    result.forEach((element) => {
      capCoinApiData.push({
        rank: element.rank,
        coinName: element.name,
        symbol: element.symbol,
        priceUsd: element.priceUsd,
        volumeUsd24Hr: element.volumeUsd24Hr,
        supply: element.supply,
        maxSupply: element.maxSupply,
        marketCapUsd: element.marketCapUsd,
        changePercent24Hr: element.changePercent24Hr,
        explorer: element.explorer,
        vwap24Hr: element.vwap24Hr,
      });
    });

    const capCoinApiInDb = await capCoin.insertMany(capCoinApiData);
    // console.log(reaquestBody);

    return res
      .status(201)
      .send({ status: true, message: "Successful", data: capCoinApiInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { capCoin100Coins };
