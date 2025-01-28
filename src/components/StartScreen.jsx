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
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-purple-400 shadow-md rounded-lg">
        <p className="text-lg font-semibold text-gray-800 text-center mb-4">
          By pressing the <span className="font-bold">'I AM READY'</span> button your test will begin.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Any unanswered questions will be marked as skipped.</li>
          <li>
            If the window loses focus, the answer will be marked as wrong, and the
            new question will start immediately.
          </li>
          <li>If the timer expires, the answer will be marked as wrong.</li>
          <li>Once you finish the test, results will be automatically sent to us.</li>
        </ul>
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-950 transition-all"
          >
            I AM READY
          </button>
        </div>
      </div>
      {!userLoggedIn && <Register />}
    </>
  );
  
}
