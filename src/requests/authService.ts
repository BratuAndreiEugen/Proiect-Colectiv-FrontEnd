import axios from 'axios';
import { ResponseProps, baseUrl, config, withLogs } from '../utils';
import { RegisterFieldValues } from "../pages/Register";

export const login = (username: string, password: string) => {
  return withLogs(axios.post(baseUrl + "/logIn", { userName: username, password: password }, config), 'login');
}

export const mockLogin = (username: string, password: string) => {
  return withLogs(new Promise<ResponseProps<string>>((res, rej) => 
  res({data: "logged in"})), "login");
}

export const register = (data: RegisterFieldValues) => {
  return withLogs(axios.post(baseUrl + "/register", data, config), 'register');
}
