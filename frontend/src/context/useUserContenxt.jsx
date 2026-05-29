import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const res = await axios.get(
        "/api/v1/auth/me",
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, getMe }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useUser = () => {
  return useContext(AuthContext);
};

