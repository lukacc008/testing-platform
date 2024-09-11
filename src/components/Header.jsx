import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logoImg from '../assets/quiz-logo.png';
import useAuth from '../hooks/useAuth'; // Import the useAuth hook

export default function Header() {
  const { auth } = useAuth(); // Get the auth state from the useAuth hook

  // Check if the user is an Admin
  const isAdmin = auth?.roles?.includes(5150); // 5150 is the Admin role ID

  return (
    <header>
      <img src={logoImg} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
      <nav>
        {/* Conditionally render the Results link only if the user is an Admin */}
        {isAdmin && <Link to="/results">Results</Link>}
      </nav>
    </header>
  );
}
