import React from "react";

import * as d3 from "d3";

const TreeBar = ({ x, y, height }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {d3.range(height / 12).map(i => {
        return (
          <text x={0} y={-i * 12} style={{ fontSize: "20px" }}>
            &#x1F384;
          </text>
        );
      })}
    </g>
  );
};

export default function BarChart({ data, value }) {
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.year))
    .range([0, 600]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d[value])])
    .range([0, 300]);

  return (
    <>
      {data.map(d => (
        <>
          <TreeBar x={xScale(d.year)} y={350} height={yScale(d[value])} />
          <text
            x={xScale(d.year)}
            y={370}
            style={{ strike: "black", fontSize: "12px" }}
            textAnchor="center"
          >
            {d.year}
          </text>
        </>
      ))}
    </>
  );
}
