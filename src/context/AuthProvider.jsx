import { createContext, useState, useEffect } from "react";

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

  const [userReady, setUserReady] = useState(false); // move userReady to context

  const onStart = () => {
    console.log("Start button clicked, setting userReady to true...");
    setUserReady(true);
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setUserLoggedIn(!!auth.accessToken); // Set userLoggedIn based on accessToken
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
