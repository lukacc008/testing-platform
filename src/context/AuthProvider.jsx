import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Include username and email in the auth state
  const [auth, setAuth] = useState({ username: '', email: '' });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userLoggedIn, setUserLoggedIn, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
