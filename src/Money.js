import React, { useEffect, useState } from "react";
import * as d3 from "d3";

import LineChart from "./line-chart.js";

export default function Money() {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.tsv("/money.tsv", ({ year, avg_spend }) => ({
      year: Number(year),
      avg_spend: Number(avg_spend)
    })).then(data => setData(data));
  }, []);

  return (
    <>
      <h1>Money spend in christmas</h1>
      <svg width="600" height="600">
        {data && (
          <LineChart data={data} x={50} y={100} width={700} height={400} />
        )}
      </svg>
    </>
  );
}
