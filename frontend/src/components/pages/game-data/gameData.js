import React, { useEffect, useState } from "react";
import { socket } from "../../socket.io-connection/socket";


export default function gameData() {
  let [err, setError] = useState(null);
  let [data, setData] = useState([]);

  useEffect(() => {
    socket.on("connection", () => {
      setSocketConnected(true);
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

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

  return (
    <div
      style={{
        padding: "3rem",
        marginTop: "7vh",
        width: "50%",
      }}
    >
      <h1 style={{ marginBottom: "15px" }}>GameData</h1>

      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {/* <ButtonGroup>
          <Button color="primary" onClick={fetchData}>
            All Bets
          </Button>
          <Button color="primary" onClick={fetchUserBets}>
            Your Bets
          </Button>
          <Button color="primary">High Rolls</Button>
        </ButtonGroup> */}
      </div>
      <div style={{ overflowY: "scroll", height: "60vh" }}>
        <table className="table table">
          <thead>
            <tr>
              <th style={{ width: "2rem", padding: "10px" }} scope="col">
                userId
              </th>
              <th style={{ width: "2rem", padding: "10px" }} scope="col">
                player name
              </th>
              <th style={{ width: "2rem", padding: "10px" }} scope="col">
                bet
              </th>

              <th style={{ width: "2rem", padding: "10px" }} scope="col">
                player count
              </th>
              <th style={{ width: "2rem", padding: "10px" }} scope="col">
                result
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0
              ? data.map((e, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{e.userId}</th>
                      <td>{e.name}</td>
                      <td>{e.betAmount}</td>
                      <td>{e.playerCount}</td>
                      <td>{e.result}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
