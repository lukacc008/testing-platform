// Quiz.js
import React, { useState, useCallback, useContext, useEffect } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import StartScreen from "./StartScreen.jsx";
import Summary from "./Summary.jsx";
import AuthContext from "../context/AuthProvider";

export default function Quiz({ questions }) {
  const { userReady, userLoggedIn, onStart } = useContext(AuthContext);
  const [userAnswers, setUserAnswers] = useState([]);

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

  if (!userReady) {
    return <StartScreen />;
  }

  const shuffledAnswers = [...questions[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <h2>{questions[activeQuestionIndex].text}</h2>
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
