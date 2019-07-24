import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const BottomAxis = ({ scale, x, y }) => {
  const groupElement = useRef();
  const axis = d3.axisBottom().scale(scale);

  useEffect(() => d3.select(groupElement.current).call(axis), []);

  return <g ref={groupElement} transform={`translate(${x},${y})`} />;
};

const LeftAxis = ({ scale, x, y }) => {
  const groupElement = useRef();
  const axis = d3.axisLeft().scale(scale);

  useEffect(() => d3.select(groupElement.current).call(axis), []);

  return <g ref={groupElement} transform={`translate(${x},${y})`} />;
};

export default function LineChart({ data, x, y, width, height }) {
  const [highlitght, setHighlight] = useState(null);
  const xScale = d3
    .scalePoint()
    .domain(data.map(d => d.year))
    .range([30, width - 150]);

  const yScale = d3
    .scaleLinear()
    .domain([500, d3.max(data, d => d.avg_spend)])
    .range([height, 50]);

  const line = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.avg_spend));

  return (
    <g x={x} y={y}>
      <BottomAxis scale={xScale} x={0} y={height} />
      <LeftAxis scale={yScale} x={30} y={0} />

      <path
        style={{
          strokeWidth: "3px",
          stroke: "green",
          fill: "none",
          strokeLinejoin: "round"
        }}
        d={line(data)}
      />
      {data.map(d => (
        <text
          x={xScale(d.year)}
          y={yScale(d.avg_spend)}
          textAnchor="middle"
          onMouseOver={() => setHighlight(d.year)}
          onMouseLeave={() => setHighlight(null)}
          style={{ fontSize: "20px", cursor: "pointer" }}
        >
          💰
          <title>{d.avg_spend}$</title>
        </text>
      ))}
      {highlitght && (
        <line
          style={{ strokeWidth: "1.5px", stroke: "lightgrey" }}
          x1={xScale(highlitght)}
          y1={50}
          x2={xScale(highlitght)}
          y2={height}
        />
      )}
    </g>
  );
}
