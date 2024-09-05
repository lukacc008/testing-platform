import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logoImg from '../assets/quiz-logo.png';

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
      {/* Add a simple link to the /results page */}
      <nav>
        <Link to="/results">Results</Link>
      </nav>
    </header>
  );
}
