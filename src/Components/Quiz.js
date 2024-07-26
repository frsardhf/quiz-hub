// src/components/Quiz.js
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../Services/Api';
import Question from './Question';
import Result from './Result';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);
  const [initialQuestionLoaded, setInitialQuestionLoaded] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions.slice(0, 10)); // Ensure only 10 questions
        setInitialQuestionLoaded(true); // Set flag when initial questions are loaded
      } catch (error) {
        setError('Failed to load questions. Please try again later.');
      }
    };
    getQuestions();
  }, []);

  useEffect(() => {
    let interval;
    if (initialQuestionLoaded && timer > 0 && !showResult) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setShowResult(true); // Show results when timer reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (showResult) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, initialQuestionLoaded, showResult]);

  useEffect(() => {
    if (initialQuestionLoaded && !showResult) {
      setTimer(300);
    }
  }, [initialQuestionLoaded, showResult]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return <Result score={score} totalQuestions={questions.length} />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-body text-center">
          <h5 className="card-title">Time left</h5>
          <p className="card-text display-4">
            {Math.floor(timer / 60)}m {timer % 60}s
          </p>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="card p-4 shadow">
          <Question
            question={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
          />
        </div>
      )}
      
      <div className="mt-4 text-center">
        <h6>Question {currentQuestionIndex + 1}/{questions.length}</h6>
      </div>
    </div>
  );
};

export default Quiz;
