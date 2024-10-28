import React, { useEffect, useContext } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import axios from "../api/axios.js";
import AuthContext from "../context/AuthProvider"; // Import AuthContext

export default function Summary({ userAnswers }) {
  const { auth, selectedTest } = useContext(AuthContext); // Access selectedTest from context

  // If no test is selected, return null (or handle it as needed)
  if (!selectedTest) {
    return <div>No test selected.</div>;
  }

  const { questions, testId } = selectedTest; // Dynamically get the correct set of questions and testId

  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].answers[0] // Use the correct questions array
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
          username: auth.username,
          email: auth.email,
          correctAnswersShare,
          skippedAnswersShare,
          wrongAnswersShare,
          testId, // Send testId to the server
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
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
      <h2>Test Finished!</h2>
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
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === questions[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
