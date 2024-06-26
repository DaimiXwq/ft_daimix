import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Link, useLocation } from 'react-router-dom';
import 'chart.js/auto';
import './Statistics.css';

function Statistics() {
  const location = useLocation();
  const {name, school} = location.state || {};
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Средняя оценка',
      data: [],
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    }],
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        const reviews = response.data;

        const labels = reviews.map(review => new Date(review.createdAt).toLocaleDateString());
        const ratings = reviews.map(review => review.data.averageRating);
		
		const filteredReviews = reviews.filter(review => review.userId === name + school);
        const filterRatings = filteredReviews.map(review => review.data.averageRating);
		
		const targetRatings = (name + school == "" ? ratings : filterRatings)
		
        setData({
          labels: labels,
          datasets: [{
            label: 'Средняя оценка',
            data: targetRatings,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
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
      <Line data={data} options={options} />
      <Link to="/">
        <button type="button">На главную</button>
      </Link>
    </div>
  );
}

export default Statistics;
