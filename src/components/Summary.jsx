import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import AuthContext from "../context/AuthProvider";

export default function Summary({ userAnswers }) {
  const { auth, selectedTest, setUserReady } = useContext(AuthContext);
  const { questions, testId } = selectedTest; // Dynamically get the correct set of questions and testId
  const navigate = useNavigate();

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
    navigate("/tests");
    setUserReady(false);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-6 bg-gray-900 text-white">
      <div>
        <h2 className="text-3xl font-bold text-center mb-6">Test Finished!</h2>
        <h2 className="text-3xl font-bold text-center mb-6">
          Scroll Down To Check Your Results And Proceed
        </h2>
        <button
          onClick={handleGoToTests}
          className="block mx-auto mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
        >
          Back to Tests
        </button>
        <div className="flex justify-around bg-gray-800 p-4 rounded-lg shadow-md mb-8">
          <p className="text-center">
            <span className="block text-4xl font-extrabold text-yellow-400">
              {skippedAnswersShare}%
            </span>
            <span className="text-sm uppercase tracking-wide text-gray-300">
              Skipped
            </span>
          </p>
          <p className="text-center">
            <span className="block text-4xl font-extrabold text-green-400">
              {correctAnswersShare}%
            </span>
            <span className="text-sm uppercase tracking-wide text-gray-300">
              Correct
            </span>
          </p>
          <p className="text-center">
            <span className="block text-4xl font-extrabold text-red-400">
              {wrongAnswersShare}%
            </span>
            <span className="text-sm uppercase tracking-wide text-gray-300">
              Incorrect
            </span>
          </p>
        </div>

        <ol className="space-y-4">
          {userAnswers.map((answer, index) => {
            let baseClass =
              "p-4 rounded-lg shadow-md text-white transition duration-200";
            let cssClass = "";

            if (answer === null) {
              cssClass = "bg-yellow-500"; // Skipped
            } else if (answer === questions[index].answers[0]) {
              cssClass = "bg-green-500"; // Correct
            } else {
              cssClass = "bg-red-500"; // Wrong
            }

            return (
              <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  Question {index + 1}
                </h3>
                <p className="text-gray-300 mb-2">{questions[index].text}</p>
                <p className={`${baseClass} ${cssClass}`}>
                  {answer ?? "Skipped"}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <button
        onClick={handleGoToTests}
        className="mt-6 self-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
      >
        Back to Tests
      </button>
    </div>
  );
}
