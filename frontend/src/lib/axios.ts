import axios from "axios";

const myAxios = axios.create({
  baseURL: "https:/arisa-server.anupat-dev.com/api",
  // baseURL: "http://localhost:5226/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true, // This enables sending cookies with requests
});

export default myAxios;
