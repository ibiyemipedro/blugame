import axios from 'axios';
import { base_url } from "../config/config";

function getUsersOnline(user, token) {
  return axios.post(`${base_url}/game/usersonline`, user,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function playUser(data, token) {
  return axios.post(`${base_url}/game/playuser`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
}

function gamePlay(data, token) {
  return axios.post(`${base_url}/game/gameplay`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
}

export { getUsersOnline, playUser, gamePlay };