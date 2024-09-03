import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ username: '', email: '' }); // Include username and email in the auth state
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userLoggedIn, setUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
