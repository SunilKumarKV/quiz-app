import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Header from './components/Header';
import Timer from './components/Timer';
import './styles/styles.css';

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch quiz data from API
  useEffect(() => {
    console.log('Fetching quiz data...');
    axios
      .get('/api/Uw5CrX')
      .then(response => {
        console.log('Fetched Quiz Data:', response.data);
        setQuizData(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);

  // Start quiz button handler
  const startQuiz = () => {
    console.log('Quiz started...');
    setIsQuizStarted(true);
    setIsQuizCompleted(false);
    setScore(0);
  };

  const hasValidQuestions = quizData && Array.isArray(quizData.questions) && quizData.questions.length > 0;

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        {quizData === null && <div>Loading quiz data...</div>}
        {quizData && !isQuizStarted && !isQuizCompleted && hasValidQuestions && (
          <button className='button-tracking' onClick={startQuiz}>Start Quiz</button>
        )}

        {isQuizStarted && !isQuizCompleted && hasValidQuestions && (
          <>
            <Timer />
            <Quiz
              quizData={quizData.questions}
              onFinish={finalScore => {
                setScore(finalScore);
                setIsQuizCompleted(true);
              }}
            />
          </>
        )}

        {isQuizCompleted && <Results score={score} />}
      </div>
    </div>
  );
};

export default App;
