import React, { useState, useCallback, useContext, useEffect } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import StartScreen from "./StartScreen.jsx";
import Summary from "./Summary.jsx";
import AuthContext from "../context/AuthProvider";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [userReady, setUserReady] = useState(false);  // For quiz readiness state
  const { userLoggedIn } = useContext(AuthContext); // Fetch user login state from context

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  const onStart = () => {
    console.log("Start button clicked, setting userReady to true...");
    setUserReady(true);
  };

  useEffect(() => {
    console.log("User ready:", userReady); // Log user readiness for debugging
  }, [userReady]);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  // Window blur event handler
  useEffect(() => {
    if (!quizIsComplete) {
      const handleWindowBlur = () => handleSkipAnswer();
      window.addEventListener("blur", handleWindowBlur);
      return () => window.removeEventListener("blur", handleWindowBlur);
    }
  }, [handleSkipAnswer, quizIsComplete]);

  if (quizIsComplete) return <Summary userAnswers={userAnswers} />;

  if (!userLoggedIn) {
    return (
      <div>
        <h2>Please log in or register to take the quiz</h2>
      </div>
    );
  }

  // Render the start screen if the user isn't ready
  if (!userReady) {
    console.log("Rendering StartScreen...");
    return <StartScreen onStart={onStart} />;
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
