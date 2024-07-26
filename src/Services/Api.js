// src/services/api.js
import axios from 'axios';
import axiosRetry from 'axios-retry';
import sampleQuestions from './SampleQuestions.json';

axiosRetry(axios, {
  retries: 10, // Increased number of retries
  retryDelay: (retryCount) => {
    return Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s, 8s, etc.
  },
  retryCondition: (error) => {
    return error.response.status === 429 || error.response.status >= 500; // Retry on 429 and 5xx errors
  }
});

export const fetchQuestions = async () => {
  try {
    const res = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
    return res.data.results;
  } catch (error) {
    console.error('Error fetching questions from API, using local sample data:', error);
    return sampleQuestions.results.slice(0, 10);
  }
};
