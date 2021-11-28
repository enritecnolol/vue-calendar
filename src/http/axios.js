import axios from "axios";

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;