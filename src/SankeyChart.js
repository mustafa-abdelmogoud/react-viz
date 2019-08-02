import React, { useState, useEffect, useRef } from "react";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import { scaleOrdinal } from "d3";
import chroma from "chroma-js";

function SankeyNode({ width, height, color, ...node }) {
  return (
    <>
      <rect
        x={node.x0}
        y={node.y0}
        width={node.x1 - node.x0}
        height={node.y1 - node.y0}
        fill={color(node.name)}
      >
        <title>{node.name}</title>
      </rect>
      <text x={node.x0} y={node.y0 + (node.y1 - node.y0) / 2}>
        {node.name}
      </text>
    </>
  );
}

function SankeyLink({ color, ...link }) {
  return (
    <path
      d={sankeyLinkHorizontal()(link)}
      style={{
        fill: "none",
        strokeOpacity: "0.3",
        stroke: color(link.source.name),
        strokeWidth: Math.max(1, link.width)
      }}
    />
  );
}

function Chart({ data, width, height }) {
  const layout = sankey()
    .nodeWidth(20)
    .nodePadding(20)
    .extent([[1, 1], [width - 1, height - 5]])(data);

  const color = chroma.brewer.Set3;

  const colorScale = scaleOrdinal()
    .domain(layout.nodes.map(d => d.name))
    .range(color);

  return (
    <g style={{ mixBlendMode: "multiply" }}>
      {layout.nodes.map(node => (
        <SankeyNode
          width={width}
          height={height}
          color={colorScale}
          {...node}
        />
      ))}
      {layout.links.map(link => (
        <SankeyLink color={colorScale} {...link} />
      ))}
    </g>
  );
}

export default function Sankey() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const svgRef = useRef(null);

  const [data, setDate] = useState(null);

  useEffect(() => {
    fetch("https://reactviz.holiday/datasets/ugr-sankey-openspending.json")
      .then(res => res.json())
      .then(data => setDate(data));
  }, []);

  useEffect(() => {
    function measureSVG() {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    }

    measureSVG();
    window.addEventListener("resize", measureSVG);

    return () => {
      window.removeEventListener("resize", measureSVG);
    };
  }, []);

  return (
    <svg ref={svgRef} width="80%" height="800">
      {data && <Chart width={width} height={height} data={data} />}
    </svg>
  );
}
