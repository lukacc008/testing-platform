import { useState, useContext, useEffect, useCallback, useMemo } from "react";
import AuthContext from "../context/AuthProvider.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
import StartScreen from "./StartScreen.jsx";
import Summary from "./Summary.jsx";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Test() {
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
          setShowAlert(true); // Show alert when user returns to the window
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

  const shuffledAnswers = useMemo(() => {
    if (!questions || !questions[activeQuestionIndex]) return [];
    return [...questions[activeQuestionIndex].answers].sort(
      () => Math.random() - 0.5
    );
  }, [questions, activeQuestionIndex]);

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

  // Use useMemo to ensure answers are shuffled only once when the question changes

  return (
    <section className="max-w-4xl mx-auto mt-10 p-8 bg-gray-800 rounded-md shadow-md text-center">
      <div className="mb-6">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={60000}
          onTimeout={handleSkipAnswer}
          className="font-nunito text-white bg-blue-500 p-3 rounded-md"
        />
      </div>

      {/* Question Text */}
      <h2 className="text-2xl font-bold text-white mb-6">
        {questions[activeQuestionIndex].text}
      </h2>

      {/* Answer Choices */}
      <ul className="w-full flex flex-col items-center gap-3">
        {shuffledAnswers.map((answer) => (
          <li key={answer} className="w-[90%]">
            <button
              onClick={() => handleSelectAnswer(answer)}
              className="w-full font-nunito text-lg py-3 px-6 bg-blue-500 text-white rounded-md transition-all duration-200 hover:bg-blue-600 focus:bg-blue-600"
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>

      {/* Snackbar Alert for Missed Questions */}
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
    </section>
  );
}
