import React from "react";
import * as d3 from "d3";

export default function VerticalBar({ data, height, width, valueFunction }) {
  const leftMargin = 100;

  const yScale = d3
    .scaleBand()
    .paddingInner(0.1)
    .domain(data.map(d => d.movie))
    .range([0, height]);

  const widthScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, valueFunction)])
    .range([leftMargin, width]);

  return (
    <g>
      {data.map(d => (
        <>
          <rect
            style={{ fill: "green", transition: "width 500ms" }}
            x={leftMargin}
            y={yScale(d.movie)}
            height={yScale.bandwidth()}
            width={widthScale(valueFunction(d))}
          />
          <text
            style={{
              fill: "white",
              fontSize: "11px",
              alignmentBaseline: "central"
            }}
            x={leftMargin + 10}
            y={yScale(d.movie) + yScale.bandwidth() / 2}
          >
            {d.movie}
          </text>
        </>
      ))}
    </g>
  );
}
