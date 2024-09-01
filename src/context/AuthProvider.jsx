import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Manage user login state

  return (
    <AuthContext.Provider value={{ auth, setAuth, userLoggedIn, setUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;