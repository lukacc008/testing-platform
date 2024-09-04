import React, { useEffect, useContext } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import axios from "../api/axios.js";
import AuthContext from "../context/AuthProvider"; // Import AuthContext

export default function Summary({ userAnswers }) {
  const { auth } = useContext(AuthContext); // Access auth from context

  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  // Function to send test results to the server
  const sendTestResults = async () => {
    try {
      const response = await axios.post(
        "/test-results",
        {
          username: auth.username, // Correctly reference username and email from auth
          email: auth.email,
          correctAnswersShare,
          skippedAnswersShare,
          wrongAnswersShare,
          createdAt: auth.createdAt
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}` // Include the access token
          }
        }
      );
  
      console.log("Test results saved successfully:", response.data.message);
    } catch (error) {
      console.error(
        "Error while sending test results:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Send the test results when the component mounts
  useEffect(() => {
    sendTestResults();
  }, []);

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="skipped">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="skipped">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="skipped">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          //used for conditional rendering of correct skipped and wrong answers
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}