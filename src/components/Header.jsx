import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { auth, setAuth, userLoggedIn, setUserLoggedIn } = useAuth(); // Get the auth state
  const isAdmin = auth?.roles?.includes(5150); // Check if the user is an Admin
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      try {
        // Call the backend to handle logout using GET instead of POST
        const response = await fetch("/logout", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          // Clear local state and redirect
          setAuth({ username: "", email: "", roles: [], accessToken: "" });
          setUserLoggedIn(false);
          navigate("/login"); // Redirect to login page after logout
        }
      } catch (err) {
        console.error("Logout failed", err);
      }
    }
  };

  return (
    <header>
      <nav>
        <ul>
          {isAdmin && (
            <li>
              <Link to="/results">Results</Link>
            </li>
          )}
          {userLoggedIn && (
            <li>
              <Link to="/tests">Tests</Link>
            </li>
          )}
          <li>
            <Link to="/home">Home</Link>
          </li>
          {!userLoggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
