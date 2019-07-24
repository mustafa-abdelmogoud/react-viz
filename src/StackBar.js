import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import legend from "d3-svg-legend";

const LeftAxis = ({ scale, x, y }) => {
  const groupElement = useRef();
  const axis = d3.axisLeft().scale(scale);

  useEffect(() => d3.select(groupElement.current).call(axis), []);

  return <g ref={groupElement} transform={`translate(${x},${y})`} />;
};

const Legend = ({ scale, x, y }) => {
  const groupElement = useRef();

  useEffect(
    () =>
      d3.select(groupElement.current).call(
        legend
          .legendColor()
          .scale(scale)
          .title("Age groups")
      ),
    []
  );

  return <g ref={groupElement} transform={`translate(${x},${y})`} />;
};

const BarChart = ({ entries, yScale, xScale, marginLeft, color }) => (
  <>
    {entries.map(([min, max], i) => (
      <rect
        x={marginLeft + xScale(min)}
        width={xScale(max) - xScale(min)}
        y={yScale(yScale.domain()[i])}
        height={yScale.bandwidth()}
        key={yScale.domain()[i]}
        fill={color}
      >
        <title>
          {min}, {max}
        </title>
      </rect>
    ))}
  </>
);

export default function({ data, height }) {
  const marginLeft = 225;

  const stack = d3.stack(data).keys(["young", "mid", "old"]);

  const bars = stack(data);

  const color = chroma.brewer.Pastel1;

  const yScale = d3
    .scaleBand()
    .paddingInner(0.1)
    .domain(data.map(d => d.category))
    .range([0, height]);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(bars[2], d => d[1])])
    .range([0, 400]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(["🧒 18 to 29 years", "🙍‍♂️ 30 to 59 years", "🧓 60 years or older"])
    .range(color);

  return (
    <g>
      <LeftAxis scale={yScale} x={220} y={0} />

      {stack(data).map((entries, i) => (
        <BarChart
          yScale={yScale}
          entries={entries}
          key={i}
          marginLeft={marginLeft}
          color={color[i]}
          xScale={xScale}
        />
      ))}
      <Legend scale={colorScale} x={500} y={height - 100} />
    </g>
  );
}
