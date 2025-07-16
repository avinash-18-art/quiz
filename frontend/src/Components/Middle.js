import React, { useState } from 'react';
import './Middle.css';

function Middle() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    {
      question: 'Q1. What is the purpose of useEffect in React?',
      options: ['A. To define routes', 'B. To directly update the DOM', 'C. To perform side effects like data fetching', 'D. To create reusable components'],
    },
    {
      question: 'Q2. Which of the following is true about React keys?',
      options: ['A. Keys are required only in class components', 'B. Keys help React identify which items have changed', 'C. Keys must always be random', 'D. Keys cannot be strings'],
    },
    {
      question: 'Q3. What is JSX in React?',
      options: ['A. A JavaScript function', 'B. A templating language', 'C. A syntax extension for JavaScript', 'D. A JSON structure'],
    },
    {
      question: 'Q4. How can you pass data from parent to child component in React?',
      options: ['A. Using Redux', 'B. Using useState', 'C. Using props', 'D. Using useEffect'],
    },
    {
      question: 'Q5. What will happen if you update state directly (e.g., state = newValue) in React?',
      options: ['A. Component will re-render', 'B. It will throw a runtime error', 'C. Nothing happens', 'D. It will update correctly'],
    },
    {
      question: 'Q6. Which module is used to create a server in Node.js?',
      options: ['A. fs', 'B. http', 'C. os', 'D. net'],
    },
    {
      question: 'Q7. What does req.params in Express.js contain?',
      options: ['A. URL query parameters', 'B. Route parameters from the URL', 'C. Request headers', 'D. Body data'],
    },
    {
      question: 'Q8. What is middleware in Express.js?',
      options: ['A. A tool for rendering views', 'B. A component that processes requests/responses', 'C. A database', 'D. A built-in encryption system'],
    },
    {
      question: 'Q9. What is the purpose of package.json in a Node.js project?',
      options: ['A. To define CSS structure', 'B. To describe the project and manage dependencies', 'C. To log server activity', 'D. To store environment variables'],
    },
    {
      question: 'Q10. How do you handle asynchronous code in Node.js?',
      options: ['A. Only using setTimeout', 'B. Using loops', 'C. Using Promises or async/await', 'D. Node.js does not support async code'],
    },
    {
      question: 'Q11. What does the useState hook return?',
      options: ['A. Only the current state value', 'B. A state setter function', 'C. An array with current state and setter function', 'D. An object with multiple properties'],
    },
    {
      question: 'Q12. What happens when a component re-renders in React?',
      options: ['A. It resets all state values', 'B. It destroys and re-creates the component', 'C. It updates only the changed DOM elements', 'D. It reloads the entire application'],
    },
    {
      question: 'Q13. Which hook is used for performance optimization to memoize values?',
      options: ['A. useEffect', 'B. useState', 'C. useMemo', 'D. useReducer'],
    },
    {
      question: 'Q14. In which scenario would you use useCallback?',
      options: ['A. To fetch data', 'B. To update DOM', 'C. To prevent function re-creation on every render', 'D. To manage CSS'],
    },
    {
      question: 'Q15. What is the virtual DOM in React?',
      options: ['A. A server-side rendered page', 'B. A copy of the actual DOM used for faster updates', 'C. The browser’s memory storage', 'D. The actual page DOM'],
    },
    {
      question: 'Q16. Which statement about Node.js is true?',
      options: ['A. It runs on the browser', 'B. It\'s synchronous by default', 'C. It uses an event-driven, non-blocking I/O model', 'D. It cannot connect to databases'],
    },
    {
      question: 'Q17. What command initializes a Node.js project with package.json?',
      options: ['A. node start', 'B. npm install', 'C. npm init', 'D. node init'],
    },
    {
      question: 'Q18. Which HTTP method is used to update data on the server?',
      options: ['A. GET', 'B. DELETE', 'C. POST', 'D. PUT'],
    },
    {
      question: 'Q19. What does res.json(data) do in Express.js?',
      options: ['A. Returns a text response', 'B. Parses the body', 'C. Sends a JSON response to the client', 'D. Creates a new route'],
    },
    {
      question: 'Q20. What is the role of dotenv in Node.js?',
      options: ['A. Database connection', 'B. Handling routes', 'C. Managing environment variables', 'D. Rendering views'],
    },
  ];

  const correctAnswers = [
    'C', 'B', 'C', 'C', 'B',
    'B', 'B', 'B', 'B', 'C',
    'C', 'C', 'C', 'C', 'B',
    'C', 'C', 'D', 'C', 'C'
  ];

  const handleOptionChange = (questionIndex, value) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }

    let score = 0;
    correctAnswers.forEach((correct, index) => {
      if (selectedAnswers[index]?.charAt(0) === correct) {
        score += 5;
      }
    });

    setResult({
      score,
      message:
        score >= 80
          ? '🎉 Congratulations! You are selected for the next round!'
          : '😢 Sorry! You did not qualify. Better luck next time!',
    });
  };

  return (
    <div className="background-developer">
      <h2 className="Heading">We Are Hiring for FullStack Developer Role</h2>
      <h4 className="mcqs">MCQs</h4>
      <p className="paragraph">This is an MCQ-based assessment. Each question carries 5 marks. Total: 100</p>

      {questions.map((q, index) => (
        <div key={index} className="mcq-question" style={{ marginBottom: '20px' }}>
          <label className="paragraph" style={{ fontWeight: 'bold' }}>{q.question}</label>
          <div>
            {q.options.map((option, optIndex) => (
              <div key={optIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={option}
                    onChange={() => handleOptionChange(index, option)}
                    checked={selectedAnswers[index] === option}
                    style={{ marginRight: '8px' }}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="button" onClick={handleSubmit}>Submit</button>

      {result && (
        <div className="popup">
          <div className="popup-content">
            <p>{result.message}</p>
            <p>Your Score: {result.score} / 100</p>
            <button onClick={() => setResult(null)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Middle;
