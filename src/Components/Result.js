// src/components/Result.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <div className="card-body text-center">
          <h2 className="card-title mb-4">Quiz Finished</h2>
          <p className="card-text display-4">
            Your Score: <span className="font-weight-bold">{score}</span> / <span className="font-weight-bold">{totalQuestions}</span>
          </p>
          <a href="/" className="btn btn-primary mt-4">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Result;
