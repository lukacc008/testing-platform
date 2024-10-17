import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("Setting timeout");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("Setting interval");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Calculate the remaining minutes and seconds
  const minutes = Math.floor(remainingTime / 60000); // Convert milliseconds to minutes
  const seconds = Math.floor((remainingTime % 60000) / 1000); // Convert milliseconds to seconds

  return (
    <div id="timer-container" style={{ display: "flex", alignItems: "center" }}>
      {/* Progress bar */}
      <progress
        id="question-time"
        max={timeout}
        value={remainingTime}
        style={{ flexGrow: 1 }}
      />

      {/* Time display */}
      <span style={{ marginLeft: "10px", fontSize: "16px" }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds} {/* Add leading zero for seconds */}
      </span>
    </div>
  );
}
