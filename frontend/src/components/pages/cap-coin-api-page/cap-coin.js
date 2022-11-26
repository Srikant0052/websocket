import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../socket-io-connection/socket";

function Capcoin() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [coinData, setCoinData] = useState([]);

  // console.log(coinData);
  useEffect(() => {
    // client-side
    socket.on("connection", () => {
      setSocketConnected(true);
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    //Emit events
    socket.emit("newData", coinData);

    //Listen for events
    socket.on("newData", async function (data) {
      // console.log(data);
      let show = await data;
      setCoinData(show);
    });
    // socket.on("loading", (data) => {
    //   // setSocketData(data);
    // });

    //Listen for events
    socket.on("newMData", async function (data) {
      // let somethig = await data;
      // console.log(somethig)
      // setSocketData(somethig)
    });

    socket.on("connect_error", (error) => {
      console.log(error);
    });
  }, [data]);

  async function getCoinData() {
    try {
      let response2 = await axios({
        method: "get",
        url: "https://api.coincap.io/v2/assets",
      });
      if (response2.data) {
        setCoinData(response2.data.data);
        setData(response2.data.data);
      }
      // console.log(response2);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCapCoinDb() {
    try {
      let resp = await axios({
        method: "post",
        url: "http://localhost:4000/cap100Coin",
        data: { ...coinData },
      });
      // console.log(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setInterval(() => {
      //   getCoinData();
      saveCapCoinDb();
    }, 3000);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="BistampsData">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <h3 style={{ padding: "10px auto", fontFamily: "monospace" }}>
            last 24(Hr) data
          </h3>
        </div>
        <table className="table" style={{ padding: "10px auto" }}>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Symbol</th>
              <th scope="col">Coin Name</th>
              <th scope="col">Price(USD)</th>
              <th scope="col">Market Cap(USD)</th>
              <th scope="col">Supply</th>
              <th scope="col">Volume(24Hr)</th>
              <th scope="col">Change%(24Hr)</th>
            </tr>
          </thead>
          <tbody>
            {coinData && coinData.length > 0 ? (
              coinData.map((coin, index) => (
                <tr key={index}>
                  <td>{coin.rank}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.name}</td>
                  <td>{coin.priceUsd}</td>
                  <td>{coin.marketCapUsd}</td>
                  <td>{coin.supply}</td>
                  <td>{coin.volumeUsd24Hr}</td>
                  <td>{coin.changePercent24Hr}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Coin</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <button type="button" className="btn btn-primary">
          Primary
        </button> */}
      </div>
    </>
  );
}

export default Capcoin;
