import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth
      ? JSON.parse(savedAuth)
      : { username: "", email: "", roles: [], accessToken: "" };
  });
  const [persist, setPersist] = useState(() => {
    return JSON.parse(localStorage.getItem("persist")) || false;
  });
  
  const [userReady, setUserReady] = useState(false); 
  const [selectedTest, setSelectedTest] = useState(null);

  const onStart = () => {
    console.log("Start button clicked, setting userReady to true...");
    setUserReady(true);
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.get("/refresh", { withCredentials: true });
      setAuth((prev) => ({
        ...prev,
        accessToken: response.data.accessToken,
      }));
      return response.data.accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      setUserLoggedIn(false); // Log user out if refresh fails
    }
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setUserLoggedIn(!!auth.accessToken);
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        userLoggedIn,
        setUserLoggedIn,
        onStart,
        userReady,
        selectedTest,
        setSelectedTest,
        refreshAccessToken, // Provide refreshAccessToken to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
