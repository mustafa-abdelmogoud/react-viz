import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import DonutChart from "./DonutChart";

export default function WillBuyTree() {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.tsv("/willBuyTree.tsv", ({ answer, percentage }) => ({
      answer,
      percentage: Number(percentage)
    })).then(data => setData(data));
  }, []);

  return (
    <>
      <h1>Will you buy a christmas tree</h1>
      <svg width="800" height="600">
        {data && <DonutChart data={data} x={350} y={250} r={150} />}
      </svg>
    </>
  );
}
