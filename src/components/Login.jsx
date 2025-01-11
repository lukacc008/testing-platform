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
  const navigate = useNavigate();

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
      <p style={{ color: "red", display: "flex", justifyContent: "center" }}>
        NOTE: FIRST REQUEST MAY TAKE UP TO 40+ SECONDS DUE TO USING FREE
        VERSION OF RENDER
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
            <Link to="/tests">Go to Tests</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button disabled={loading}>
              {loading ? <CircularProgress size={50} sx={{ color: "white" }} /> : "Sign In"}
            </button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
