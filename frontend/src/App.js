import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
var socket;

function App() {
  const [data, setData] = useState([]);
  const [mongoData, setMongoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketData, setSocketData] = useState([]);

  // console.log(socketData);
  useEffect(() => {
    socket = io(`${ENDPOINT}`, {
      cors: "*",
      transports: ["websocket"],
    });

    console.log(socket);
    // client-side
    // socket.on("connection", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });

    // socket.emit("newData", data);
    // socket.on("newData", (data) => {
    //   // setSocketData(data);
    //   // console.log("socket", data);
    // });
    // socket.on("loading", (data) => {
    //   // setSocketData(data);
    //   // console.log("socket", data);
    // });

    // fetchFtxData();
    socket.on("connect_error", (error) => {
      console.log(error);
    });
  }, []);

  async function saveFtxData() {
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:4000/bitstampApi",
      });
      if (response.data.bitstampData) {
        setData(response.data.bitstampData);
        // setSocketData(response.data.bitstampData)
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchFtxData() {
    try {
      let response1 = await axios({
        method: "get",
        url: "http://localhost:4000/pairBitstamp",
      });
      let result = response1.data.bitstampApiData;
      if (response1.data.bitstampApiData) {
        setMongoData(result);
        setSocketData([...result]);
      }
      // console.log(response1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  setInterval(() => {
    saveFtxData();
  }, 10000);

  useEffect(() => {
    fetchFtxData();
  }, [data]);

  const coinPair = [];

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
              <th scope="col">#</th>
              <th scope="col">Pair Name</th>
              <th scope="col">Last Price</th>
              <th scope="col">Low Price</th>
              <th scope="col">High Price</th>
              <th scope="col">Volume</th>
              <th scope="col">Bid Price</th>
            </tr>
          </thead>
          <tbody>
            {socketData && socketData.length > 0 ? (
              socketData.map((coin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{coin.pairName}</td>
                  <td>{coin.lastPrice}</td>
                  <td>{coin.lowPrice}</td>
                  <td>{coin.highPrice}</td>
                  <td>{coin.volume}</td>
                  <td>{coin.bidPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Coin Pair</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
