import React from 'react';

function StartScreen({ onStart }) {
  return (
    <div id="start">
        <p>By pressing the 'I AM READY' button your test will begin.</p>
        <p style={{ color: 'red' }}>Any unanswered questions will be marked as wrong answers.</p>
      <button onClick={onStart}>I AM READY</button>
    </div>
  );
}

export default StartScreen;