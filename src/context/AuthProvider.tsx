import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLogger } from "../utils";
import { login as loginRequest } from "../requests/authService";
import { useHistory } from "react-router";
import { getUserByUsername } from "../requests/userService";

const log = getLogger("AuthProvider");

type LoginFn = (username: string, password: string) => void;

export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login?: LoginFn;
  logout?: () => void;
  username: string;
  password: string;
  token: string;
  userId: number | null;
  bio: string;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  isAuthenticating: false,
  authenticationError: null,
  username: localStorage.getItem("username") ?? "",
  password: "",
  bio: "",
  userId: parseInt(localStorage.getItem("id") ?? ""),
  token: localStorage.getItem("token") ?? "",
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const history = useHistory();
  const {
    isAuthenticated,
    isAuthenticating,
    authenticationError,
    token,
    username,
    password,
    userId,
    bio,
  } = state;

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserByUsername(username);
      const userId = response.id;
      const { bio } = response;
      setState({ ...state, userId, bio });
    };
    if (username.length > 0) {
      fetchUserInfo();
    }
  }, [username]);

  const login = useCallback<LoginFn>(loginCallback, []);

  const logout = useCallback(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    localStorage.setItem("id", "");
    setState({
      ...state,
      isAuthenticated: false,
      isAuthenticating: false,
      token: "",
      username: "",
      password: "",
    });
    history.push("/login");
  }, []);

  useEffect(authenticationEffect, [isAuthenticating]);
  const value = {
    isAuthenticated,
    login,
    logout,
    isAuthenticating,
    authenticationError,
    token,
    username,
    password,
    userId,
    bio,
  };

  log("render");
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  function loginCallback(username: string, password: string): void {
    log("login");
    setState({
      ...state,
      isAuthenticating: true,
      username,
      password,
    });
  }

  function authenticationEffect() {
    let canceled = false;
    authenticate();
    return () => {
      canceled = true;
    };

    async function authenticate() {
      if (!isAuthenticating) {
        log("authenticate, !isAuthenticating, return");
        return;
      }
      try {
        log("authenticate...");
        setState({
          ...state,
          isAuthenticating: true,
        });
        const { username, password, userId } = state;
        const authToken = await loginRequest(username, password);
        if (canceled) {
          return;
        }
        log("authenticate succeeded");
        setState({
          ...state,
          token: authToken,
          isAuthenticated: true,
          isAuthenticating: false,
        });
        localStorage.setItem("token", authToken);
        localStorage.setItem("username", username);
        if(userId)
          localStorage.setItem("id", userId.toString());
      } catch (error) {
        if (canceled) {
          return;
        }
        log("authenticate failed");
        setState({
          ...state,
          authenticationError: error as Error,
          isAuthenticating: false,
        });
      }
    }
  }
};
