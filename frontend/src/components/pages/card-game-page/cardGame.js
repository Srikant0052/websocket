import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import GameData from "../game-data/gameData";
import { socket } from "../../socket.io-connection/socket";

export default function CardGame() {
  const [liveBettingTable, setLiveBettingTable] = useState();
  const [tenNumbers, setTenNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [betData, setBetData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [socketId, setSocketId] = useState([]);
  let [err, setErr] = useState(null)

  let userId = localStorage.getItem("userId");
  console.log(userId);

  console.log(socketId);
  useEffect(() => {
    socket.on("connection", () => {
      setSocketConnected(true);
    });
    setSocketId(socket.id); // x8WIv7-mJelg7on_ALbx
    console.log(socket.id);

    //Emit events
    socket.emit("game", data);

    //Listen for events
    socket.on("game", async function (data) {
      // console.log(data);
      let show = await data;
      //   setSocketData(show);
    });

    socket.on("connect_error", (error) => {
      console.log(error);
    });
  }, []);

  //Create Game
  async function createBet() {
    try {
      let resp = await axios({
        method: "post",
        url: `http://localhost:4000/game`,
        data: {
          blackCardPlayerIdList: selectedCard,
          redCardPlayerIdList: selectedCard,
          // roundNumber,
          activePlayerIdList: userId,
          // roundIdList,
        },
      });
      console.log(resp);
      if (resp.data.data) {
        setBetData(resp.data.data);
      }
    } catch (error) {
      // setErr(error.response.data);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <div
        className="grid-elements"
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          marginTop: "10px",
        }}
      >
        {/* <div style={{ padding: "20px" }}>Select Card</div> */}
        {/* <div className="select-card" style={{ display: "flex" }}> */}
        <div
          style={{
            marginTop: "5vh",
            padding: "3rem",
            width: "50%",
            borderRight: "2px solid black",
          }}
        >
          <u>Card Bet</u>
          <div
            className="select-card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px",
            }}
          >
            <div>
              <button
                onClick={(e) => {
                  createBet();
                  setSelectedCard("Red");
                }}
                type="button"
                className="btn btn-primary"
              >
                Select Red
              </button>
            </div>
            <div>
              <button
                onClick={(e) => {
                  createBet();
                  setSelectedCard("Black");
                }}
                type="button"
                className="btn btn-primary"
              >
                Select Black
              </button>
            </div>
          </div>
        </div>
        <GameData />
      </div>
    </React.Fragment>
  );
}
