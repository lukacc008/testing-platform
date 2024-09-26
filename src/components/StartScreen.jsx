import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Register from "./Register";
import AuthContext from "../context/AuthProvider";

export default function StartScreen() {
  const { userLoggedIn, onStart } = useContext(AuthContext); // Access from context directly
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    console.log("I AM READY button clicked");
    onStart(); // Call the function from context
    navigate("/test"); // Navigate to the /test route
  };

  return (
    <>
      <div id="start">
        <p>By pressing the 'I AM READY' button your test will begin.</p>
        <ul style={{ color: "black" }}>
          <li>Any unanswered questions will be marked as skipped.</li>
          <li>
            If the window loses focus, the answer will be marked as wrong and
            the new question will start immediately.
          </li>
          <li>If the timer expires, the answer will be marked as wrong.</li>
          <li>
            Once you finish the test, results will be automatically sent to us.
          </li>
        </ul>
        <button onClick={handleClick}>I AM READY</button>
      </div>
      {!userLoggedIn && <Register />}
    </>
  );
}
