import axios from "axios";

const api = axios.create({
  baseURL: "https:/localhost:4444",
});

export default api;
