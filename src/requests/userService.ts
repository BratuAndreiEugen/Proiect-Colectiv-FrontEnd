import { baseUrl, config, ResponseProps, withLogs } from "../utils";
import axios from "axios";

export const getUserByUsername = (username: string) => {
    return withLogs(axios.get(`${baseUrl}/users/${username}`, config), 'getUserByUsername');
};