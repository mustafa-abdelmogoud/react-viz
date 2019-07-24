import React, { useState, useContext } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";

import { TooltipContext } from "./Tooltip";

const Arc = ({ d, r, color, offsetX, offsetY }) => {
  const [selected, setSelected] = useState(false);
  const tooltipContext = useContext(TooltipContext);

  const arc = d3
    .arc()
    .outerRadius(selected ? r + 10 : r)
    .innerRadius(selected ? r - 150 : r - 140)
    .padAngle(0.01);

  const mouseOver = () => {
    const [x, y] = arc.centroid(d);

    setSelected(true);
    tooltipContext.setTooltip({
      show: d.index !== null,
      x: x + offsetX + 30,
      y: y + offsetY + 30,
      content: d.data.product,
      orientLeft: offsetX < 0
    });
  };

  const mouseOut = () => {
    setSelected(null);
    tooltipContext.setTooltip({ show: false });
  };

  return (
    <path
      d={arc(d)}
      fill={color}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      style={{ cursor: "pointer" }}
    />
  );
};

export default function StockingDonut({ data, x, y, r }) {
  const pie = d3.pie().value(d => d.percentage);

  const color = chroma.brewer.set3;
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pie(data).map(d => (
        <Arc
          d={d}
          color={color[d.index]}
          r={r}
          key={d.index}
          offsetX={x}
          offsetY={y}
        />
      ))}
    </g>
  );
}
