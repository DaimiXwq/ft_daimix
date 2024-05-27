import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

function Statistics() {
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Средняя оценка',
      data: [],
      backgroundColor: 'rgba(75,192,192,1)',
    }],
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        const reviews = response.data;
        const labels = reviews.map(review => new Date(review.createdAt).toLocaleDateString());
        const ratings = reviews.map(review => review.data.averageRating);

        setData({
          labels: labels,
          datasets: [{
            label: 'Средняя оценка',
            data: ratings.map((rating, index) => ({ x: labels[index], y: rating })),
            backgroundColor: 'rgba(75,192,192,1)',
          }],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
      },
      y: {
        beginAtZero: true,
        suggestedMax: 5,
      },
    },
  };

  return (
    <div>
      <h1>График оценки качества образования</h1>
      <Scatter data={data} options={options} />
    </div>
  );
}

export default Statistics;
