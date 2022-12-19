import React, { useEffect, useState } from "react";

export default function Timer() {
  const [timer, setTimer] = useState();

  useEffect(() => {
    const source = new EventSource(`http://localhost:4000`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      console.log(e.data);
      // const data: Donation = JSON.parse(e.data);

      setTimer(e.data);
    });

    source.addEventListener("error", (error) => {
      console.error("Error: ", error);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div>
      <h1>Timer:</h1>
      <hr />
      {/* <h3>Total amount: {donation.amount}</h3>
      <h3>Total user: {donation.user}</h3> */}
      <div>Next Bet On:{timer}</div>
    </div>
  );
}
