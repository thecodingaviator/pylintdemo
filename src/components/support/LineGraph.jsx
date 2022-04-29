/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useAuth } from '../../contexts/AuthContext';

export default function LineGraph(props) {
  const { getScores } = useAuth();
  const { id } = props;
  const [scoreData, setScoreData] = React.useState([]);
  const [labels, setLabels] = React.useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: [
        {
          ticks: {
            stepSize: 0.5,
          },
        },
      ],
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Scores',
        data: scoreData,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };

  useEffect(() => {
    getScores(id).then((res) => {
      let scores = res.score;
      scores = scores.split(',');
      if (scores[0] === 'undefined') {
        scores.shift();
      }

      const dataNew = [];

      for (let i = 0; i < scores.length; i += 1) {
        const currScore = parseInt(scores[i], 10);
        dataNew.push(currScore || 0);
      }

      setScoreData(dataNew);

      const labelsNew = [];
      const labelsLength = scores.length < 20 ? scores.length : scores.length / 5 + 1;

      for (let i = 0; i < labelsLength; i += 1) {
        labelsNew.push(i);
      }

      setLabels(labelsNew);
    });
  }, []);

  return <Line options={options} data={data} />;
}
