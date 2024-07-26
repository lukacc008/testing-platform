import React from "react";
import Register from "./Register";

function StartScreen({ onStart }) {
  return (
    <>
      <div id="start">
        <p>By pressing the 'I AM READY' button your test will begin.</p>
        <p style={{ color: "red" }}>
          Any unanswered questions will be marked as skipped which is basically wrong.
        </p>
        <button onClick={onStart}>I AM READY</button>
      </div>
      <Register />
    </>
  );
}

export default StartScreen;
