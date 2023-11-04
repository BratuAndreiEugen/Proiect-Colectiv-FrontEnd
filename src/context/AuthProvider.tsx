import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLogger } from "../utils";
import { login as loginRequest } from "../requests";
import { mockLogin as loginMockRequest } from "../requests";

const log = getLogger("AuthProvider");

type LoginFn = (username: string, password: string) => void;

export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login?: LoginFn;
  username: string;
  password: string;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  authenticationError: null,
  username: "",
  password: "",
  token: "",
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const {
    isAuthenticated,
    isAuthenticating,
    authenticationError,
    token,
    username,
    password,
  } = state;

  console.log(state);

  const login = useCallback<LoginFn>(loginCallback, []);

  useEffect(authenticationEffect, [isAuthenticating]);
  const value = {
    isAuthenticated,
    login,
    isAuthenticating,
    authenticationError,
    token,
    username,
    password,
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
        const { username, password } = state;
        await loginMockRequest(username, password);
        if (canceled) {
          return;
        }
        log("authenticate succeeded");
        setState({
          ...state,
          token,
          isAuthenticated: true,
          isAuthenticating: false,
        });
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
