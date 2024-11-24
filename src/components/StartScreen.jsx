import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

export default function StartScreen() {
  const { userReady, setUserReady, selectedTest, onStart, userLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset userReady state when the component mounts
    setUserReady(false);
  }, [setUserReady, selectedTest]); // Reset when selectedTest changes

  const handleClick = () => {
    console.log("I AM READY button clicked");
    onStart(); // Sets userReady to true
    navigate("/test"); // Navigate to the test page
  };

  if (!selectedTest) {
    return <p>No test selected. Please go back and select a test.</p>;
  }

  return (
    <>
      <div id="start">
        <p>By pressing the 'I AM READY' button your test will begin.</p>
        <ul style={{ color: "black" }}>
          <li>Any unanswered questions will be marked as skipped.</li>
          <li>If the window loses focus, the answer will be marked as wrong and the new question will start immediately.</li>
          <li>If the timer expires, the answer will be marked as wrong.</li>
          <li>Once you finish the test, results will be automatically sent to us.</li>
        </ul>
        <button onClick={handleClick}>I AM READY</button>
      </div>
      {!userLoggedIn && <Register />}
    </>
  );
}
