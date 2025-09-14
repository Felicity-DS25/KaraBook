import { createContext, useContext, useMemo, useState, useEffect } from "react";
import api from "../api/axios";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id,name,email,mobile,role}
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // restore from storage if you want — minimal: just mark ready
    setReady(true);
  }, []);

  const loginWithTokens = (payload) => {
    localStorage.setItem("owner_access", payload.accessToken);
    localStorage.setItem("owner_refresh", payload.refreshToken);
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem("owner_access");
    localStorage.removeItem("owner_refresh");
    setUser(null);
    window.location.href = "/login";
  };

  const value = useMemo(() => ({ user, ready, loginWithTokens, logout }), [user, ready]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
