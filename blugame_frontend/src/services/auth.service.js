import axios from 'axios';
import { base_url } from "../config/config";

function userRegister(user) {
  return axios.post(base_url + '/auth', {
    username: user.username,
    password: user.password,
    flag: 'register'
  });
}

function userLogin(user) {
  return axios.post(base_url + '/auth', {
    username: user.username,
    password: user.password,
  });
}

export { userRegister, userLogin };