import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import VerticalBar from "./VerticalBar";

export default function MovieBox() {
  const [data, setData] = useState(null);
  const [perYear, setPerYear] = useState(false);

  useEffect(() => {
    d3.tsv("/movies.tsv", ({ movie, box_office }) => {
      const year = Number(movie.match(/\((\d+)\)/)[1]);
      return {
        movie: movie.replace(/(d+)/, ""),
        year: year,
        per_year: Number(box_office) / (2018 - year),
        box_office: Number(box_office)
      };
    }).then(data => setData(data));
  }, []);

  const valueFunction = perYear ? d => d.per_year : d => d.box_office;

  return (
    <>
      <div>
        <h1>Movies at Box Office</h1>
        <button
          style={{
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
            outline: "none",
            cursor: "pointer"
          }}
          onClick={() => setPerYear(!perYear)}
        >
          {perYear ? "show total box office" : "show box office per year"}
        </button>
      </div>

      <svg width="800" height="600">
        {data && (
          <VerticalBar
            data={data.sort((a, b) => valueFunction(b) - valueFunction(a))}
            width="600"
            height="500"
            valueFunction={valueFunction}
          />
        )}
      </svg>
    </>
  );
}
