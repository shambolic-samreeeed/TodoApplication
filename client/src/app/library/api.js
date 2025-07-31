import axios from "axios";

const api = axios.create({
  baseURL: "https://todoapplication-tf68.onrender.com/api",
});

export default api;
