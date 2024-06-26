import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SchoolCritic.css';

function SchoolCritic() {
  const [school, setSchool] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  
  const handleClickEvaluation = () => {
    const data = { name:name, school:school }; 
    navigate('/evaluation-form', { state: data });
  };
  const handleClickStatistics = () => {
    const data = { name:name, school:school }; 
    navigate('/statistics', { state: data });
  };
  
  
  return (
    <div>
      <h1>Школьный критик</h1>
      <form>
        <label>
          Учебное заведение
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </label>
        <br />
        <label>
          Ф.И.О. (Иванов Иван Иванович)
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div> 
            <button onClick={handleClickEvaluation}>Анкета</button>			
            <button onClick={handleClickStatistics}>Статистика</button>
        </div>
      </form>
    </div>
  );
}


export default SchoolCritic;
