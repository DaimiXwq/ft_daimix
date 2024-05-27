import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SchoolCritic() {
  const [school, setSchool] = useState('');
  const [name, setName] = useState('');

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
          <Link to="/evaluation-form">
            <button type="button">Анкета</button>
          </Link>
          <Link to="/statistics">
            <button type="button">Статистика</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SchoolCritic;
