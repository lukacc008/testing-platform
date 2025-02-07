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
      setUserLoggedIn(false); 
    }
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setUserLoggedIn(!!auth.accessToken);
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  // Reset userReady when selectedTest changes
  useEffect(() => {
    if (selectedTest) {
      setUserReady(false);
    }
  }, [selectedTest]);
 
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
        setUserReady,
        selectedTest,
        setSelectedTest,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
