import axios from 'axios';
import { ResponseProps, baseUrl, config, withLogs } from '../utils';

const authUrl = `http://${baseUrl}/api/auth/login`;


export const login = (username: string, password: string) => {
  return withLogs(axios.post(authUrl, { username, password }, config), 'login');
}

export const mockLogin = (username: string, password: string) => {
  return withLogs(new Promise<ResponseProps<string>>((res, rej) => 
  res({data: "logged in"})), "login");
}
