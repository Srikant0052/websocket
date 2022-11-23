const express = require("express");
const dotenv = require("dotenv");
const route = require("./src/routes/route");
const mongoose = require("mongoose");
const cors = require("cors");

let bitstampModel = require("./src/models/bitstamp");

dotenv.config();
const app = express();
app.use(express.json()); // to accept json data
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let MONGODB_URI =
  "mongodb+srv://siamaqConsultancy:siamaqAdmin@siamaqdatabase.obfed2x.mongodb.net/websocket";
let port = process.env.PORT || 4000;
// let databaseUrl = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDb Is Connected"))
  .catch((err) => console.log(err));

app.use("/", route);

const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);
  // console.log(socket)

  socket.on("newData", function (data) {
    io.sockets.emit("newData", data);
    // console.log(data);
  });

  // socket.on("loading", function (data) {
  //   socket.emit("loading", data);
  //   // console.log(data);
  // });
  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.log(error);
    // socket.connect();
  });
});

const connection = mongoose.connection;

connection.once("open", () => {
  // console.log("MongoDB database connected");
  console.log("Setting change streams");

  const datachange = connection.collection("bitstamps").watch();

  datachange.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        const mData = {
          _id: change.fullDocument._id,
          // pairName: change.fullDocument.pairName,
          // description: change.fullDocument.description,
        };

        io.of("/socket").emit("newData", mData);
        break;
      case "delete":
        io.of("/socket").emit("deletedData", change.documentKey._id);
        break;
    }
    // console.log(change);
  });
});
// socket connection
// io.on("connection", (socket) => {
// changeStream.on("change", (next) => {
//   // process any change event
//   switch (next.operationType) {
//     case "insert":
//       io.emit("chat message", next.fullDocument.bitstamp);
//       console.log(next.fullDocument.bitstamp);
//       break;
//     case "update":
//       io.emit("chat message", next.updateDescription.updatedFields.bitstamp);
//       console.log(next.updateDescription.updatedFields.bitstamp);
//   }
// });
// });
