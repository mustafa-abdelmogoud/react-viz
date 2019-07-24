import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import StackBar from "./StackBar";

export default function WantToBuy() {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.tsv("/wantToBuy.tsv", ({ category, young, mid, old }) => ({
      category,
      young: Number(young),
      mid: Number(mid),
      old: Number(old)
    })).then(data => setData(data));
  }, []);

  return (
    <>
      <h1>What American's want to buy for christmas</h1>
      <svg width="800" height="600">
        {data && <StackBar data={data} height="500" />}
      </svg>
    </>
  );
}
