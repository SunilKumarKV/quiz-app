import React, { useState, useEffect } from 'react';

const Quiz = ({ quizData, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.length).fill(null));
  const [startTime, setStartTime] = useState(Date.now());
  const [correctStreak, setCorrectStreak] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const [bonusTimeScore, setBonusTimeScore] = useState(4);
  const [currentScore, setCurrentScore] = useState(0);

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    let score = 0;

    if (selectedAnswer === currentQuestion.options.find(opt => opt.is_correct)?.description) {
      // Correct answer
      const timeTaken = (Date.now() - startTime) / 1000; 

      if (timeTaken <= 10) {
        score = bonusTimeScore;
      } else {
        score = 4; // Standard score for correct answers
      }

      // score multiplier based on consecutive correct answers
      score *= scoreMultiplier;

      setCurrentScore(prevScore => prevScore + score);
      setCorrectStreak(prevStreak => prevStreak + 1);
      setScoreMultiplier(correctStreak >= 3 ? scoreMultiplier + 1 : scoreMultiplier);
    } else {
      // Incorrect answer
      setCorrectStreak(0);
      setScoreMultiplier(1);
      score = -1; 
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(Date.now());
    } else {
      onFinish(currentScore);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setStartTime(Date.now()); 
    }
  };

  const handleFinishQuiz = () => {
    // Finish the quiz
    onFinish(currentScore);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h3>{currentQuestion.description}</h3>
      <div className="options">
        {currentQuestion.options.map((option) => (
          <div key={option.id}>
            <button
              id="quiz-question"
              onClick={() => handleAnswerChange(currentQuestionIndex, option.description)}
              className={selectedAnswers[currentQuestionIndex] === option.description ? 'selected' : ''}
            >
              {option.description}
            </button>
          </div>
        ))}
      </div>

      <div className="navigation">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="prev-button"
        >
          Previous
        </button>
        {currentQuestionIndex < quizData.length - 1 && (
          <button className="next-button" onClick={handleNextQuestion}>Next</button>
        )}
        {currentQuestionIndex === quizData.length - 1 && (
          <button onClick={handleFinishQuiz} className="finish-button">Finish Quiz</button>
        )}
      </div>

      <div>
        <p>Time left: {Math.max(0, 10 - (Math.floor((Date.now() - startTime) / 1000)))} seconds</p>
      </div>
    </div>
  );
};

export default Quiz;
