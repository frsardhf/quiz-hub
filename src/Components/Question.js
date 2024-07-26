// src/components/Question.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import he from 'he'; // Import the he library for decoding HTML entities

const Question = ({ question, handleAnswer }) => {
  const { question: questionText, correct_answer, incorrect_answers } = question;

  // Decode HTML entities
  const decodedQuestionText = he.decode(questionText);
  const decodedCorrectAnswer = he.decode(correct_answer); 
  const decodedIncorrectAnswers = incorrect_answers.map(answer => he.decode(answer)); 

  const answers = [...decodedIncorrectAnswers, decodedCorrectAnswer].sort();

  return (
    <div>
      <h5 className="mb-4">{decodedQuestionText}</h5>
      <div className="list-group">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer === decodedCorrectAnswer)}
            className="list-group-item list-group-item-action"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
