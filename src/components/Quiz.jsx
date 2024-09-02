import { useState, useCallback, useContext, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import StartScreen from "./StartScreen.jsx";
import Summary from "./Summary.jsx";
import Register from "./Register.jsx";
import AuthContext from "../context/AuthProvider"; // Import AuthContext

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [userReady, setUserReady] = useState(false);

  // Get userLoggedIn state from AuthContext
  const { userLoggedIn } = useContext(AuthContext);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  function onStart() {
    setUserReady(true);
  }

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  useEffect(() => {
    function handleWindowBlur() {
      // Mark the question as skipped if the window loses focus
      handleSkipAnswer();
    }

    // Add event listener for the window blur event
    window.addEventListener("blur", handleWindowBlur);

    // Cleanup the event listener when the component is unmounted or when question changes
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [handleSkipAnswer]); // Dependency on handleSkipAnswer to ensure correct function reference

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  if (!userLoggedIn) {
    return (
      <div>
        <h2>Please log in or if you do not have an account register</h2>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

  if (!userReady && userLoggedIn) {
    return <StartScreen onStart={onStart} />;
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
