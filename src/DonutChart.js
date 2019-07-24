import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import legend from "d3-svg-legend";

const Legend = ({ scale, x, y }) => {
  const groupElement = useRef();

  useEffect(
    () =>
      d3.select(groupElement.current).call(legend.legendColor().scale(scale)),
    []
  );

  return <g ref={groupElement} transform={`translate(${x},${y})`} />;
};

export default function DonutChart({ data, x, y, r }) {
  const [selected, setSelected] = useState(null);

  const pie = d3.pie().value(d => d.percentage);

  const arc = d3
    .arc()
    .innerRadius(90)
    .outerRadius(r)
    .padAngle(0.01);

  const color = chroma.brewer.Set1;

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map(d => d.answer))
    .range(color);

  return (
    <g transform={`translate(${x},${y})`}>
      {pie(data).map(d => (
        <path
          d={arc
            .outerRadius(selected === d.index ? r + 10 : r)
            .innerRadius(selected === d.index ? 80 : 90)(d)}
          fill={color[d.index]}
          onMouseOver={() => setSelected(d.index)}
          onMouseLeave={() => setSelected(null)}
        />
      ))}

      <Legend scale={colorScale} x={x - 150} y={y - 180} />
    </g>
  );
}
