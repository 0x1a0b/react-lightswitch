import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";

const flareText = `{
  "name": "flare",
  "children": [
    {
      "name": "analytics",
      "children": [
        {
          "name": "cluster",
          "children": [
            {"name": "AgglomerativeCluster", "value": 3938},
            {"name": "CommunityStructure", "value": 3812},
            {"name": "MergeEdge", "value": 743}
          ]
        },
        {
          "name": "optimization",
          "children": [
            {"name": "AspectRatioBanker", "value": 7074}
          ]
        }
      ]
    },
    {
      "name": "data",
      "children": [
        {
          "name": "converters",
          "children": [
            {"name": "Converters", "value": 721},
            {"name": "DelimitedTextConverter", "value": 4294},
            {"name": "JSONConverter", "value": 2220}
          ]
        },
        {"name": "DataField", "value": 1759},
        {"name": "DataSchema", "value": 2165},
        {"name": "DataTable", "value": 772},
        {"name": "DataUtil", "value": 3322}
      ]
    },
    {
      "name": "flex",
      "children": [
        {"name": "FlareVis", "value": 4116}
      ]
    },
    {
      "name": "util",
      "children": [
        {"name": "Displays", "value": 12555},
        {"name": "Filter", "value": 2324},
        {"name": "Geometry", "value": 10993},
        {
          "name": "heap",
          "children": [
            {"name": "FibonacciHeap", "value": 9354},
            {"name": "HeapNode", "value": 1233}
          ]
        },
        {"name": "IEvaluable", "value": 335},
        {"name": "IPredicate", "value": 383},
        {"name": "IValueProxy", "value": 874},
        {
          "name": "math",
          "children": [
            {"name": "DenseMatrix", "value": 3165},
            {"name": "IMatrix", "value": 2815},
            {"name": "SparseMatrix", "value": 3366}
          ]
        },
        {"name": "Maths", "value": 17705},
        {"name": "Orientation", "value": 1486},
        {
          "name": "palette",
          "children": [
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ColorPalette", "value": 6367},
            {"name": "ShapePalette", "value": 2059},
            {"name": "SizePalette", "value": 2291}
          ]
        },
        {"name": "Property", "value": 5559},
        {"name": "Shapes", "value": 19118},
        {"name": "Strings", "value": 22026}
      ]
    }
  ]
}`;
let flareObject = JSON.parse(flareText);

export default function D3Expansion(props) {
    const svgRef = React.useRef(null);
    const svgWidth = 1000;

    const tree = (data) => {
        const root = d3.hierarchy(data);
        root.dx = 10;
        root.dy = svgWidth / (root.height + 1);
        return d3.tree().nodeSize([root.dx, root.dy])(root);
    };

    const chart = () => {

        // remove old artefacts
        let clearance = d3.select(svgRef.current)
                          .selectAll("*")
                          .remove();

        const root = tree(flareObject);

        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        let svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, svgWidth, x1 - x0 + root.dx * 2]);

        const g = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 8)
            .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

        const link = g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));

        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke", "white");

        return svg.node();
    };

    useEffect(() => {
        chart();
    }, []);

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                D3 effect hook
            </Typography>
            <div className='diagram'>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    )
}
