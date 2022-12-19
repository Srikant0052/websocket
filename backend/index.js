const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require("moment");
const { notFound, errorHandler } = require("./src/utils/error");
const Stopwatch = require("statman-stopwatch");
const sw = new Stopwatch(true);
const { Server } = require("socket.io");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

//Routes
const timerRoute = require("./src/routes/timerRoute");
const cardGameRoute = require("./src/routes/cardGameRoute");
const playerRoute = require("./src/routes/playerRoute");
const gameRoute = require("./src/routes/gameRoute");
const timerModel = require("./src/models/timerModel");

let MONGODB_URI =
  "mongodb+srv://siamaqConsultancy:siamaqAdmin@siamaqdatabase.obfed2x.mongodb.net/timer";
let port = process.env.PORT || 4000;

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDb Is Connected"))
  .catch((err) => console.log(err));

// app.get("/st", async (req, res) => {
//   try {
//     const data = await timerModel.findById("6399b9472fe0594e5d9e5f3f");
//     //console.log(data)

//     return res.send(data);
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// });

app.get("/retrieve", async (req, res) => {
  // const game_loop = await Game_loop.findById(GAME_LOOP_ID)
  // crashMultipler = game_loop.multiplier_crash
  // res.json(crashMultipler)
  const delta = sw.read(2);
  let seconds = delta / 1000.0;
  seconds = seconds.toFixed(2);
  console.log(delta);
  return;
});

app.get("/", (req, res) => {
  console.log("Client connected");
  res.setHeader("Content-Type", "text/event-stream");

  let timeToStart = 10;
  let myduration = moment.duration(10, "ss");

  const intervalId = setInterval(() => {
    // if (timeToStart === 0) {
    //     // clearInterval(intervalId)
    //     timeToStart = 10;
    //   } else {
    //     timeToStart;
    //     }
    //     timeToStart--;
    // moment().subtract(Duration);
    // const myduration = moment.duration({
    // milliseconds:'29',
    // seconds: '15',
    // });
    const delta = sw.read(2);
    let seconds = delta / 1000.0;
    seconds = seconds.toFixed(2);

    let time = moment().second(); //.get('second')

    const date = new Date().toLocaleString();
    res.write(`data: ${seconds}\n\n`);
  }, 1000);

  res.on("close", () => {
    console.log("Client closed connection");
    clearInterval(intervalId);
    res.end();
  });
});

//Middlewares
app.use("/", timerRoute);
app.use("/", cardGameRoute);
app.use("/", playerRoute);
app.use("/", gameRoute);

//Error Middlewares
app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let activeUser = []
exports.socketConnection = io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);
  activeUser.push(socket.id)
  
  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
    activeUser = activeUser.filter(id => id != socket.id)
  });
  
  socket.on("connect_error", (error) => {
    console.log(error);
  });
  socket.on("clicked", (data) => {
    
  });
  console.log(activeUser)
});

//Socket.io Connection Setup
// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("socket.io: User connected: ", socket.id);
//   // console.log(socket)

// socket.on("disconnect", () => {
//   console.log("socket.io: User disconnected: ", socket.id);
// });

// socket.on("connect_error", (error) => {
//   console.log(error);
// });
// });
