import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from MUI
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid entry");
      return;
    }

    setLoading(true); // Start loading when submitting

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Axios response:", response.data);
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <>
  <p className="text-red-500 text-center mt-5 mb-5">
    NOTE: FIRST REQUEST MAY TAKE UP TO 40+ SECONDS DUE TO USING FREE VERSION OF RENDER
  </p>
  {success ? (
    <section className="text-center">
      <h1 className="text-2xl font-bold text-green-500">Success!</h1>
      <p className="mt-4">
        <Link to="/login" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </section>
  ) : (
    <section className="flex flex-col items-center p-6 bg-gray-800 rounded-md shadow-md w-full max-w-lg mx-auto">
      <p
        ref={errRef}
        className={`${
          errMsg ? "bg-pink-300 text-red-700 p-2 rounded mb-4" : "hidden"
        }`}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-2xl font-bold text-white mb-6">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        {/* Username */}
        <label htmlFor="username" className="text-white">
          Username:
          <span className={`${validName ? "text-green-500 ml-2" : "hidden"}`}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={`${validName || !user ? "hidden" : "text-red-500 ml-2"}`}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="font-nunito text-lg p-2 w-full text-black rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p
            id="uidnote"
            className={`${
              userFocus && user && !validName ? "text-gray-400 text-sm mt-2" : "hidden"
            }`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. Letters,
            numbers, underscores, hyphens allowed.
          </p>
        </div>

        {/* Email */}
        <label htmlFor="email" className="text-white">
          Email:
          <span className={`${validEmail ? "text-green-500 ml-2" : "hidden"}`}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={`${validEmail || !email ? "hidden" : "text-red-500 ml-2"}`}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="font-nunito text-lg p-2 w-full text-black rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p
            id="emailnote"
            className={`${
              emailFocus && email && !validEmail ? "text-gray-400 text-sm mt-2" : "hidden"
            }`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid email
            address.
          </p>
        </div>

        {/* Password */}
        <label htmlFor="password" className="text-white">
          Password:
          <span className={`${validPwd ? "text-green-500 ml-2" : "hidden"}`}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={`${validPwd || !pwd ? "hidden" : "text-red-500 ml-2"}`}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="font-nunito text-lg p-2 w-full text-black rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p
            id="pwdnote"
            className={`${
              pwdFocus && !validPwd ? "text-gray-400 text-sm mt-2" : "hidden"
            }`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. Must
            include uppercase, lowercase, number, and special character.
          </p>
        </div>

        {/* Confirm Password */}
        <label htmlFor="confirm_pwd" className="text-white">
          Confirm Password:
          <span
            className={`${
              validMatch && matchPwd ? "text-green-500 ml-2" : "hidden"
            }`}
          >
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span
            className={`${
              validMatch || !matchPwd ? "hidden" : "text-red-500 ml-2"
            }`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <div className="relative">
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="font-nunito text-lg p-2 w-full text-black rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p
            id="confirmnote"
            className={`${
              matchFocus && !validMatch ? "text-gray-400 text-sm mt-2" : "hidden"
            }`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
            password.
          </p>
        </div>
 
        {/* Submit Button */}
        <button
          disabled={
            !validName || !validPwd || !validMatch || !validEmail || loading
          }
          className={`${
            !validName || !validPwd || !validMatch || !validEmail || loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-nunito text-lg p-3 rounded focus:outline-none`}
        >
          {loading ? (
            <CircularProgress size={30} sx={{ color: "white" }} />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <p className="text-gray-300 mt-4">
        Already registered?
        <br />
        <span className="line">
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </span>
      </p>
    </section>
  )}
</>

  );
};

export default Register;
