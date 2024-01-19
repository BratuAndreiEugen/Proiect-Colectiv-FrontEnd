import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLogger } from "../utils";
import { login as loginRequest } from "../requests/authService";
import { useHistory } from "react-router";
import {
  getFollowersByUsername,
  getFollowingByUsername,
  getUserByUsername,
} from "../requests/userService";
import { User, UserShort } from "../model/user";

const log = getLogger("AuthProvider");

type LoginFn = (username: string, password: string) => void;

export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login?: LoginFn;
  logout?: () => void;
  toggleFollow?: (user: User) => void;
  username: string;
  password: string;
  token: string;
  userId: number | null;
  bio: string;
  followers: User[];
  following: User[];
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
  followers: [],
  following: [],
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
    followers,
    following,
  } = state;

  useEffect(() => {
    const getFollowing = async () => {
      if (username) {
        const followersList: UserShort[] = await getFollowersByUsername(
          username
        );
        const followingList: UserShort[] = await getFollowingByUsername(
          username
        );
        const userFollowersList: User[] = followersList.map(
          ({ bio, id, username }) => ({
            userId: id,
            description: bio,
            username,
          })
        );
        const userFollowingList: User[] = followingList.map(
          ({ bio, id, username }) => ({
            userId: id,
            description: bio,
            username,
          })
        );
        setState({
          ...state,
          followers: userFollowersList,
          following: userFollowingList,
        });
      }
    };

    getFollowing();
  }, []);

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

  const toggleFollow = (user: User) => {
    let updatedFollowing = [...following];
    let exists = false;
    for (const currentUser of following) {
      if (currentUser.userId == user.userId) {
        exists = true;
        updatedFollowing = following.filter(
          (currentUser) => user.userId != currentUser.userId
        );
      }
    }
    if (!exists) updatedFollowing.push(user);
    setState({ ...state, following: updatedFollowing });
  };

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
    followers,
    following,
    toggleFollow,
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
        const authToken = await loginRequest(username, password);
        const response = await getUserByUsername(username);
        log("USERNAME " + username);
        log("ID " + response.id);
        log(response);
        setState({
          ...state,
          userId: response.id,
        });
        if (canceled) {
          return;
        }
        log("authenticate succeeded" + userId);
        setState({
          ...state,
          token: authToken,
          isAuthenticated: true,
          isAuthenticating: false,
        });
        localStorage.setItem("token", authToken);
        localStorage.setItem("username", username);
        if (response.id) localStorage.setItem("id", response.id.toString());
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
