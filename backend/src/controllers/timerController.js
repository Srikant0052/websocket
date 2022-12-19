const timerModel = require("../models/timerModel");
const moment = require("moment");

exports.time = async (req, res) => {
  try {
    const requestBody = req.body;
    const count = Date.now();

    const timeStamp = await timerModel.create({ countDown: 15 });
    return res
      .status(201)
      .send({ status: true, msg: "Successful", data: timeStamp });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.timeSecond = async (req, res) => {
  try {
    //     var sec = moment().second();
    //    let s= new Date().getSeconds()
    //    console.log(s)
    //     console.log("Current seconds Time:", sec);

    // var countDownDate = moment().add(10, "seconds");

    var x = setInterval(function () {

      const time = new Date();
      var t = new Date();
      t.setSeconds(t.getSeconds() + 5);
      let timeToCount = t - time;
    //   console.log(timeToCount);

    }, 1000);

    

    // return res.status(201).send({ status: true, msg: "Successful" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
