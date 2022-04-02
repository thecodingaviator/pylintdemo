/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useAuth } from '../contexts/AuthContext';

import './ScatterPlot.css';

function ScatterPlot(props) {
  const [userScores, setUserScores] = useState(null);
  const { getScores } = useAuth();
  const svgRef = useRef();

  useEffect(() => {
    const userID = props.id;
    getScores(userID).then((res) => {
      let scores = res.score;
      scores = scores.split(',');
      if (scores[0] === 'undefined') {
        scores.shift();
      }
      
      let dataArray = [];

      for (let i = 0; i < scores.length; i++) {
        dataArray.push([
          i,
          parseInt(scores[i], 10),
        ]);
      }

      setUserScores(dataArray);

      const data = dataArray;
      console.log(data);

      // set up container
      const w = 400;
      const h = 400;
      const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('overflow', 'visible')
        .style('margin-top', '20px');

      // set up scaling
      const xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, w]);

      const yScale = d3.scaleLinear()
        .domain([-10, d3.max(data, (d) => d[1])])
        .range([h, 0]);

      // set up axes
      const xAxis = d3.axisBottom(xScale).ticks(data.length);
      const yAxis = d3.axisLeft(yScale).ticks(10);

      svg.append('g')
        .call(xAxis)
        .attr('transform', `translate(5, ${h + 15})`);

      svg.append('g')
        .call(yAxis)
        .attr('transform', `translate(-5, 0)`);

      // set up labels
      svg.append('text')
        .attr('x', w - 60)
        .attr('y', h + 50)
        .style('fill', '#fff')
        .text('Attempt #');

      svg.append('text')
        .attr('x', -40)
        .attr('y', -40)
        .style('transform', 'rotate(-90deg)')
        .style('fill', '#fff')
        .text('Score');

      // set up dots
      svg.selectAll()
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(i) + 5)
        .attr('cy', (d) => yScale(d[1]))
        .attr('r', 5)
        .attr('fill', '#1f77b4');
    });
  }, [props]);

  return (
    <div className="plot">
      <svg ref={svgRef} className="mt-5 mb-5 pb-5" />
    </div>
  );
}

export default ScatterPlot;
