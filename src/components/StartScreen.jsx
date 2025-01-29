import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

export default function StartScreen() {
  const { userReady, setUserReady, selectedTest, onStart, userLoggedIn } =
    useContext(AuthContext);
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
      <section className="flex flex-col items-center p-6 bg-gray-800 rounded-md shadow-md w-full max-w-lg mx-auto mt-10">
        <p className="text-lg font-semibold text-white text-center mb-4">
          By pressing the <span className="font-bold">'I AM READY'</span>{" "}
          button, your test will begin.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>Any unanswered questions will be marked as skipped.</li>
          <li>
            If the window loses focus, the answer will be marked as wrong, and a
            new question will start immediately.
          </li>
          <li>If the timer expires, the answer will be marked as wrong.</li>
          <li>
            Once you finish the test, results will be automatically sent to us.
          </li>
        </ul>
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white font-nunito text-lg p-3 rounded hover:bg-blue-600 transition-all"
          >
            I AM READY
          </button>
        </div>
      </section>

      {!userLoggedIn && <Register />}
    </>
  );
}
