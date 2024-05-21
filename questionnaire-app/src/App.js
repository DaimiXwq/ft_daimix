import React from 'react';
import Questionnaire from './components/Questionnaire';

const user = { edinst: "myschool", occupation: "guest" };
const userId = 0;

const App = () => {
    return (
        <div className="App">
            <Questionnaire user={user} userId={userId} />
        </div>
    );
};

export default App;
