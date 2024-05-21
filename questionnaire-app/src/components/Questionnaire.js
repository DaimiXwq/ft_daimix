import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Questionnaire = ({ user, userId }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios.get('/api/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error("Ошибка при загрузке вопросов!", error);
            });
    }, []);

    const handleNextQuestion = () => {
        const newResponse = {
            question: questions[currentQuestionIndex],
            rating: rating,
            comment: comment
        };
        setResponses([...responses, newResponse]);
        setRating(0);
        setComment('');
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            axios.post('/api/save_responses', {
                user: user,
                userId: userId,
                responses: [...responses, newResponse]
            })
            .then(response => {
                console.log("Ответы успешно сохранены!");
            })
            .catch(error => {
                console.error("Ошибка при сохранении ответов!", error);
            });
        }
    };

    return (
        <div>
            <h1>Анкета</h1>
            <p>Пользователь: {user.occupation}</p>
            <p>Учебное заведение: {user.edinst}</p>
            {questions.length > 0 && (
                <>
                    <p>{questions[currentQuestionIndex]}</p>
                    <div>
                        {[1, 2, 3, 4, 5].map(value => (
                            <label key={value}>
                                <input
                                    type="radio"
                                    value={value}
                                    checked={rating === value}
                                    onChange={() => setRating(value)}
                                />
                                {value}
                            </label>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Введите ваш комментарий"
                    />
                    <button onClick={handleNextQuestion}>Следующий вопрос</button>
                </>
            )}
        </div>
    );
};

export default Questionnaire;
