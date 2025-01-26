import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export default function TestCard({
  title,
  image,
  description,
  numQuestions,
  route,
  questions,
  testId,
  isCompleted,
}) {
  const navigate = useNavigate();
  const { setSelectedTest } = useContext(AuthContext);

  const handleCardClick = () => {
    if (!isCompleted) {
      setSelectedTest({ title, questions, testId });
      navigate(route);
    }
  };

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform ${
        isCompleted ? "cursor-not-allowed opacity-50" : "hover:scale-105"
      }`}
      onClick={handleCardClick}
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">
          {numQuestions && `${numQuestions} questions`}
        </p>
      </div>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {isCompleted && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center text-white text-center p-4">
          <p className="text-lg font-semibold">Results for {testId} submitted</p>
        </div>
      )}
    </div>
  );
}
