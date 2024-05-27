import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EvaluationForm() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const reviewData = {
        userId: 'user-id',
        occupation: 'occupation',
        school: 'school-name',
        ratings: [score],
        comments: [comment],
        averageRating: score
      };
      axios.post('http://localhost:5000/api/reviews', reviewData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Анкета оценки</h1>
      <label>{questions[currentQuestionIndex].question}</label>
      <div>
        {[1, 2, 3, 4, 5].map(num => (
          <label key={num}>
            <input 
              type="radio" 
              value={num} 
              checked={score === num} 
              onChange={() => setScore(num)} 
            />
            {num}
          </label>
        ))}
      </div>
      <textarea
        placeholder="Комментарий"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={handleNext}>След. вопрос</button>
      <br />
      <Link to="/">
        <button type="button">На главную</button>
      </Link>
    </div>
  );
}

export default EvaluationForm;
