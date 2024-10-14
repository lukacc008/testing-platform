import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Register from "./Register";

export default function StartScreen() {
  const { userLoggedIn, onStart } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // To access the questions passed via state
  // const { questions } = location.state; // Extract questions from state

  const handleClick = () => {
    console.log("I AM READY button clicked");
    onStart(); // Call the function from context
    navigate("/test"); // Pass questions to Quiz via state
  };

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
