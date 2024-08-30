import axios from "axios";
const BASE_OAUTH_URL = process.env.REACT_APP_BACKEND_URL

export const axiosPrivate = axios.create({
  baseURL: BASE_OAUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const $fetcher = axios.create({
  baseURL: BASE_OAUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default function fetcher() {
  return $fetcher
}
