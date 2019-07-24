import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import StockingDonut from "./StockingDonut";
import Tooltip, { TooltipContext } from "./Tooltip";

export default function Stocking() {
  const [data, setData] = useState(null);

  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: "",
    orientLeft: false
  });

  useEffect(() => {
    d3.tsv("/stocking.tsv", ({ product, percentage }) => ({
      product,
      percentage: Number(percentage)
    })).then(data => setData(data));
  }, []);

  return (
    <>
      <h1>What goes in stockings for Christmas?</h1>
      <TooltipContext.Provider value={{ ...tooltip, setTooltip }}>
        <svg width="800" height="600">
          {data && <StockingDonut data={data} x={350} y={250} r={200} />}

          <Tooltip x={100} y={100} width={150} height={90}>
            <p
              style={{
                backgroundColor: "green",
                borderRadius: "3px",
                padding: "1em"
              }}
            >
              {tooltip.content}
            </p>
          </Tooltip>
        </svg>
      </TooltipContext.Provider>
    </>
  );
}
