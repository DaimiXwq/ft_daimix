import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './EvaluationForm.css';

function EvaluationForm() {
  const location = useLocation();
  const {name, school} = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);

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
    setRatings([...ratings, score]);
    setComments([...comments, comment]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setScore(0);
      setComment('');
    } else {
      const averageRating = ratings.reduce((sum, rating) => sum + rating, score) / (ratings.length + 1);
      const reviewData = {
        userId: name+school,
        occupation: name,
        school: school,
        ratings: [...ratings, score],
        comments: [...comments, comment],
        averageRating: averageRating
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
