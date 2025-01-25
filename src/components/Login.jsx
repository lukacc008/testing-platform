import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, setUserLoggedIn } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Response data:", response?.data);

      // Extract the required data from the response
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const email = response?.data?.email;
      const username = response?.data?.username;

      // Update the auth state with username, email, roles, and access token
      setAuth({ username, email, roles, accessToken });

      // TEMPORARY LOG
      console.log("Updated auth state after login:", {
        username,
        email,
        roles,
        accessToken,
      });

      setUser("");
      setPwd("");
      setSuccess(true);
      setUserLoggedIn(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    } finally {
      setLoading(false); // Reset loading state to false when the request is done
    }
  };

  return (
    <>
  <p className="text-red-500 mt-5">
    NOTE: FIRST REQUEST MAY TAKE UP TO 40+ SECONDS DUE TO USING FREE VERSION OF RENDER
  </p>
  {success ? (
    <section>
      <Alert
        variant="filled"
        icon={<CheckIcon fontSize="inherit" />}
        severity="success"
      >
        Successful login!
      </Alert>
      <p>
        <Link to="/tests" className="text-blue-500 hover:underline">
          Go to Tests
        </Link>
      </p>
    </section>
  ) : (
    <section className="flex flex-col items-center p-6 bg-gray-800 rounded-md shadow-md">
      <p
        ref={errRef}
        className={`${
          errMsg ? "bg-pink-300 text-red-700 p-2 rounded" : "hidden"
        }`}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-2xl text-white font-bold mb-6">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <label htmlFor="username" className="text-white">
          Username:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          className="font-nunito text-lg p-2 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="text-white">
          Password:
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          className="font-nunito text-lg p-2 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-nunito text-lg p-3 rounded focus:outline-none`}
        >
          {loading ? (
            <CircularProgress size={30} sx={{ color: "white" }} />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <p className="text-gray-300 mt-4">
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </span>
      </p>
    </section>
  )}
</>

  );
};

export default Login;
