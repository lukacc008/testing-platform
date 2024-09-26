import React, { useState, useCallback, useContext, useEffect } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import StartScreen from "./StartScreen.jsx";
import Summary from "./Summary.jsx";
import AuthContext from "../context/AuthProvider";

export default function Quiz() {
  const { userReady, userLoggedIn, onStart } = useContext(AuthContext); // Use context for userReady and other states
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  useEffect(() => {
    if (!quizIsComplete) {
      const handleWindowBlur = () => handleSkipAnswer();
      window.addEventListener("blur", handleWindowBlur);
      return () => window.removeEventListener("blur", handleWindowBlur);
    }
  }, [handleSkipAnswer, quizIsComplete]);

  console.log("userReady:", userReady);  // <-- Add this to debug userReady
  console.log("userLoggedIn:", userLoggedIn);  // <-- Debug userLoggedIn

  if (quizIsComplete) return <Summary userAnswers={userAnswers} />;

  if (!userLoggedIn) {
    return (
      <div>
        <h2>Please log in or register to take the quiz</h2>
      </div>
    );
  }

  // Show StartScreen if user isn't ready yet
  if (!userReady) {
    console.log("Rendering StartScreen...");  // <-- This logs if userReady is still false
    return <StartScreen />;  // No need to pass props if StartScreen uses useContext directly
  }

  // Quiz rendering logic
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
