import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/quiz-logo.png';
import useAuth from '../hooks/useAuth';

export default function Header() {
  const { auth } = useAuth(); // Get the auth state from the useAuth hook

  // Check if the user is an Admin
  const isAdmin = auth?.roles?.includes(5150);

  return (
    <header>
      <img src={logoImg} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
      <nav>
        {isAdmin && <Link to="/results">Results</Link>}
      </nav>
    </header>
  );
}
