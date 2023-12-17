import { baseUrl, config, ResponseProps, withLogs } from "../utils";
import axios from "axios";

export const getUserByUsername = (username: string) => {
    return withLogs(axios.get(`${baseUrl}/users/${username}`, config), 'getUserByUsername');
};

export const getFollowersUserName = (username: string) => {
    return withLogs(axios.get(`${baseUrl}/follow/getFollowersWithUsername?username=${username}`, config), 'getFollowersWithUsername');
}

export const getFollowingUserName = (username: string) => {
    return withLogs(axios.get(`${baseUrl}/follow/getFollowingWithUsername?username=${username}`, config), 'getFollowingWithUsername');
}

export const followWithId = (data: {followerId: number, followeeId: number}) => {
    return withLogs(axios.post(`${baseUrl}/follow/follow`, data, config), 'follow');
}

export const followWithUsername = (data: {userName: string, followeeId: number}) => {
    return withLogs(axios.post(`${baseUrl}/follow/followWithUsername`, data, config), 'followWithUsername');
}
export const getFollowersId= (id: string) => {
    return withLogs(axios.get(`${baseUrl}/follow/getFollowers?id=${id}`, config), 'followWithUsername');
}


