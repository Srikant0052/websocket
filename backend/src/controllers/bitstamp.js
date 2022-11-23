let axios = require("axios");
let bitstampModel = require("../models/bitstamp");

const bitstampFunction = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://www.bitstamp.net/api/v2/ticker/",
    };

    let response = await axios(options);
    // console.log(response);
    let result = response.data;

    let bitstampApiData = [];

    result.forEach((element) => {
      bitstampApiData.push({
        pairName: element.pair,
        lastPrice: element.last,
        bidPrice: element.bid,
        highPrice: element.high,
        lowPrice: element.low,
        volume: element.volume,
        askPrice: element.bestAsk,
        openPrice: element.open,
        priceChangePercent: element.percent_change_24,
        timeStamp: element.timestamp,
      });
    });

    let bitstampApiInDb = await bitstampModel.insertMany(bitstampApiData);
    // console.log(bitstampApiInDb);

    return res
      .status(200)
      .send({ msg: "successful", bitstampData: bitstampApiInDb });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

let getBitstampAllPair = async (req, res) => {
  try {
    let bitstampApi = await bitstampModel
      .find()
      .sort({ createdAt: -1, pairName: 1 })
      .limit(175);

    return res.json({ msg: "successfull", bitstampApiData: bitstampApi });
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "There is some technical error!", error });
  }
};

module.exports = {
  bitstampFunction,
  getBitstampAllPair,
};
