import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../api/axios.js";
import AuthContext from "../context/AuthProvider";

export default function Summary({ userAnswers }) {
  const { auth, selectedTest } = useContext(AuthContext);
  const { questions, testId } = selectedTest; // Dynamically get the correct set of questions and testId
  const navigate = useNavigate(); // Initialize navigate

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
          testId,
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

  useEffect(() => {
    sendTestResults();
  }, []);

  const handleGoToTests = () => {
    navigate("/tests"); // Redirect to /tests when the button is clicked
  };

  return (
    <div id="summary">
      <button
        onClick={handleGoToTests}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Tests
      </button>
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
