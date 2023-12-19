import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

/**
 * Graph is a React component that renders a scatter plot using D3.js.
 *
 * @component
 * @param {Array<Object>} data - An array of objects representing data points with 'x' and 'y' properties to be plotted.
 * @param {string} att1 - The attribute label for the x-axis that the data is based on.
 * @param {string} att2 - The attribute label for the y-axis that the data is based on.
 * @param {Array<string>} colorData - An array of colors corresponding to each data point's plotted color.
 * @returns {JSX.Element} JSX element representing the scatter plot.
 *
 */
const Graph = ({ data, att1, att2, colorData }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Set size consts
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    // Set range
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const svgContainer = d3.select(svgRef.current);
    svgContainer.selectAll("*").remove();

    // Create container
    const svg = svgContainer
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Background
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#F0EDE2");

    // Generate points
    const circles = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .attr("id", (_, i) => `point-${i}`)
      .attr("fill", (_, i) => colorData[i])
      .attr("stroke", "#637155");

    // Add event listeners for hover
    circles.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

    // xAxis
    const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.format(".0f"));
    svg
      .append("g")
      //number label format
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("font-family", "Gotham")
      .style("fill", "#F0EDE2")
      .style("font-weight", "regular")
      .style("stroke-width", "none");

    // xAxis label

    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${width / 2},${height + margin.top + 10})`)
      .style("font-family", "Gotham")
      .style("font-weight", "bold")
      .style("fill", "#F0EDE2")
      .text(att1);

    // yAxis
    const yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(d3.format(".0f"));
    svg
      .append("g")
      //number label format
      .call(yAxis)
      .selectAll("text")
      .style("font-family", "Gotham")
      .style("fill", "#F0EDE2")
      .style("font-weight", "regular")
      .style("stroke-width", "none");

    // yAxis label
    svg.selectAll(".y-axis-label").remove(); // Remove existing label

    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -height / 2)
      .style("font-family", "Gotham")
      .style("font-weight", "bold")
      .style("fill", "#F0EDE2")
      .text(att2);

    // handle mouseover
    function handleMouseOver(event, d) {
      svg
        .append("text")
        .attr("id", "tooltip")
        .attr("x", xScale(d.x))
        .attr("y", yScale(d.y) - 10)
        .attr("text-anchor", "middle")
        .style("font-family", "Gotham")
        .style("font-size", "small")
        .style("fill", "#637155")
        .text(`(${d.x}, ${d.y})`);
    }

    // handle mouseout
    function handleMouseOut() {
      // remove
      svg.select("#tooltip").remove();
    }
  }, [data, colorData, att1, att2]);

  return (
    <div className="w-full max-w-md mx-auto">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Graph;
