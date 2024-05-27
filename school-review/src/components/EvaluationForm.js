import React, { useState } from 'react';
import axios from 'axios';

function EvaluationForm() {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    "На сколько облагорожена территория учебного заведения?",
    "Как вы оцениваете уровень безопасности?",
    // нужно доделать
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
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

  return (
    <div>
      <h1>Анкета оценки</h1>
      <label>{questions[currentQuestion]}</label>
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
    </div>
  );
}

export default EvaluationForm;
