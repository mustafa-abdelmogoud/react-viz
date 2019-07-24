import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import logo from "./logo.svg";
import "./App.css";
import BarChart from "./bar-chart";
import Money from "./Money";
import MovieBox from "./MovieBox";
import WantToBuy from "./WantToBy";
import WillBuyTree from "./WillBuyTree";
import Stocking from "./Stocking";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      d3.csv("/trees.csv", ({ year, real_trees, fake_trees }) => ({
        year: Number(year),
        real_trees: Number(real_trees),
        fake_trees: Number(fake_trees)
      })).then(data => setData(data));
    }
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Christmas trees sold in USA</h1>
      <svg width="600" height="500">
        {data && <BarChart data={data} value="real_trees" />}
      </svg>

      <Money />

      <MovieBox />

      <WantToBuy />

      <WillBuyTree />

      <Stocking />
    </div>
  );
}

export default App;
