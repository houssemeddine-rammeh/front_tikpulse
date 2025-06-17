import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, logout as reduxLogout } from "../features/authSlice";

const UserRole = {
  ADMIN: "agencyAdmin",
  MANAGER: "manager",
  CREATOR: "creator",
};

const stringToUserRole = (role) => {
  return Object.values(UserRole).includes(role) ? role : UserRole.CREATOR;
};

const isValidUserRole = (role) => {
  return Object.values(UserRole).includes(role);
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.auth.user); // 🟢 read user from Redux
  const token = useSelector((state) => state.auth.token); // 🟢 read token from Redux
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = reduxUser
    ? {
        ...reduxUser,
        role: isValidUserRole(reduxUser.role)
          ? stringToUserRole(reduxUser.role)
          : UserRole.CREATOR,
      }
    : null;

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(signIn({ email, password }));
      const { payload } = resultAction;

      console.log("Login result:", payload);

      if (!payload?.user || !payload?.token) {
        throw new Error("Invalid login response");
      }

      return payload.user;
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed - please check your credentials");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithTikTok = async (authCode) => {
    try {
      setLoading(true);
      setError(null);

      const { authAPI } = await import("../services/api");
      const response = await authAPI.loginWithTikTok(authCode);

      if (response.user && response.token) {
        // Optionally: dispatch to Redux if you want TikTok login to also populate state
        dispatch({
          type: "auth/setUserFromTikTok", // depends on your slice
          payload: response,
        });

        return response.user;
      } else {
        throw new Error("Invalid TikTok login response");
      }
    } catch (err) {
      console.error("TikTok login failed:", err);
      setError("TikTok login failed - please try again later");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { authAPI } = await import("../services/api");
      authAPI.logout();
    } catch (err) {
      console.warn("Logout API call failed, but clearing Redux state");
    } finally {
      dispatch(reduxLogout());
    }
  };

  const value = {
    user,
    token,
    isLoading: loading,
    error,
    login,
    loginWithTikTok,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
