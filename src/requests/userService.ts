import { baseUrl, config, ResponseProps, withLogs } from "../utils";
import axios from "axios";

export const getUserByUsername = (username: string) => {
  return withLogs(
    axios.get(`${baseUrl}/users/${username}`, config),
    "getUserByUsername"
  );
};

export const followWithId = (data: {
  followerId: number;
  followeeId: number;
}) => {
  return withLogs(
    axios.post(`${baseUrl}/follow/follow`, data, config),
    "follow"
  );
};

export const followWithUsername = (data: {
  userName: string;
  followeeId: number;
}) => {
  return withLogs(
    axios.post(`${baseUrl}/follow/followWithUsername`, data, config),
    "followWithUsername"
  );
};

export const getFollowersId = (id: number) => {
  return withLogs(
    axios.get(`${baseUrl}/follow/getFollowers?id=${id}`, config),
    "followWithUsername"
  );
};

export const getFollowingById = (id: number) => {
  return withLogs(
    axios.get(`${baseUrl}/follow/getFollowingUsers?id=${id}`, config),
    "getFollowingById"
  );
};

export const getFollowingByUsername = (username: string) => {
  return withLogs(
    axios.get(`${baseUrl}/follow/getFollowingUsersWithUsername?username=${username}`, config),
    "getFollowingByUsername"
  );
};

export const getFollowersById = (id: number) => {
  return withLogs(
    axios.get(`${baseUrl}/follow/getFollowersUsers?id=${id}`, config),
    "getFollowersById"
  );
};

export const getFollowersByUsername = (username: string) => {
  return withLogs(
    axios.get(`${baseUrl}/follow/getFollowersUsersWithUsername?username=${username}`, config),
    "getFollowersByUsername"
  );
};
