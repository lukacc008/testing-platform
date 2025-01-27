import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../context/AuthProvider.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
import StartScreen from "./StartScreen.jsx";
import Summary from "./Summary.jsx";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Test() {
  const location = useLocation();
  const { userLoggedIn, userReady, selectedTest } = useContext(AuthContext);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const { questions } = selectedTest || {};

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === questions?.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    if (userReady) {
      // Only skip answers if the quiz has started
      setUserAnswers((prev) => [...prev, null]);
    }
  }, [userReady]);

  useEffect(() => {
    if (userReady && !quizIsComplete) {
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
  }, [userReady, handleSkipAnswer, quizIsComplete]);

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
    return (
      <div>
        <h2>Please log in or register to take the quiz</h2>
      </div>
    );
  }

  if (!userReady) {
    return <StartScreen />;
  }

  const shuffledAnswers = [...questions[activeQuestionIndex].answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div
      className="max-w-7xl max-h-[70rem] mt-20 mx-auto p-20 bg-gradient-to-b from-purple-900 to-purple-800 rounded-lg shadow-lg text-center"
    >
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={60000}
        onTimeout={handleSkipAnswer}
      />
      <h2 className="text-3xl font-bold text-white mb-8">
        {questions[activeQuestionIndex].text}
      </h2>
      <ul
        className="list-none m-0 p-0 flex flex-col items-center gap-2"
      >
        {shuffledAnswers.map((answer) => (
          <li key={answer} className="answer w-[90%] mx-auto">
            <button
              onClick={() => handleSelectAnswer(answer)}
              className={`w-full font-['Roboto_Condensed'] text-sm py-4 px-8 rounded-full bg-blue-400 text-white transition-all duration-200 hover:bg-purple-400 focus:bg-purple-400 selected:bg-orange-400 selected:text-purple-900 correct:bg-green-400 correct:text-purple-900 wrong:bg-pink-400 wrong:text-purple-900`}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
  
      {/* MUI Snackbar to show the alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
        >
          You missed a question because the window lost focus.
        </Alert>
      </Snackbar>
    </div>
  );
  
}
