import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./const";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Routes>
          {ROUTES.map(({ path, page }, index) => {
            return <Route path={path} key={index} element={page} />;
          })}
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
