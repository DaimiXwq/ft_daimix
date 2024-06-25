import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EvaluationForm from './components/EvaluationForm';
import SchoolCritic from './components/SchoolCritic';
import Statistics from './components/Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SchoolCritic />} />
        <Route path="/evaluation-form" element={<EvaluationForm />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
