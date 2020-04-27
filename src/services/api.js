import axios from "axios";

const api = axios.create({
  baseURL: "https://lar-back-end.herokuapp.com/",
});

export default api;
