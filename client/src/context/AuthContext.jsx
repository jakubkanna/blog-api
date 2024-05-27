import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    setToken(storedToken);
    setUsername(storedUsername);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, loading, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
