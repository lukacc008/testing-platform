import React, { useContext } from "react";
import Register from "./Register";
import AuthContext from "../context/AuthProvider";

function StartScreen({ onStart }) {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div id="start">
        <p>By pressing the 'I AM READY' button your test will begin.</p>
        <ul style={{ color: "black" }}>
          <li>Any unanswered questions will be marked as skipped.</li>
          <li>If the window loses focus, the answer will be marked as wrong and the new question will start immediately.</li>
          <li>If the timer expires, the answer will be marked as wrong.</li>
        </ul>
        <button onClick={onStart}>I AM READY</button>
      </div>
      {!userLoggedIn && <Register />}
    </>
  );
}

export default StartScreen;
