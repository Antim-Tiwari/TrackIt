import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Load token from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        API.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    }, []);


    const login = (newToken) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);

      API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      navigate("/dashboard");
    };


    const logout = () => {
      localStorage.removeItem("token");
      setToken(null);

      delete API.defaults.headers.common["Authorization"];

      navigate("/");
    };


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
