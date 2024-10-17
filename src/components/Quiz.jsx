import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../context/AuthProvider";
import QuestionTimer from "./QuestionTimer.jsx";
import StartScreen from "./StartScreen.jsx";
import Summary from "./Summary.jsx";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Quiz() {
  const location = useLocation();
  const { userLoggedIn, userReady, selectedTest } = useContext(AuthContext);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const { questions } = selectedTest;

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  useEffect(() => {
    if (!quizIsComplete) {
      const handleWindowBlur = () => {
        handleSkipAnswer();
      };

      const handleWindowFocus = () => {
        if (document.visibilityState === "visible") {
          // Show alert when user returns to the window
          setShowAlert(true);
        }
      };

      window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("focus", handleWindowFocus);

      return () => {
        window.removeEventListener("blur", handleWindowBlur);
        window.removeEventListener("focus", handleWindowFocus);
      };
    }
  }, [handleSkipAnswer, quizIsComplete]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  if (!selectedTest) {
    return <div>No test selected</div>;
  }

  if (quizIsComplete) return <Summary userAnswers={userAnswers} />;

  if (!userLoggedIn) {
    return <div><h2>Please log in or register to take the quiz</h2></div>;
  }

  if (!userReady) {
    return <StartScreen />;
  }

  const shuffledAnswers = [...questions[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QuestionTimer key={activeQuestionIndex} timeout={60000} onTimeout={handleSkipAnswer} />
      <h2>{questions[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>

      {/* MUI Snackbar to show the alert */}
      <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }} variant="filled">
          You missed a question because the window lost focus.
        </Alert>
      </Snackbar>
    </div>
  );
}
