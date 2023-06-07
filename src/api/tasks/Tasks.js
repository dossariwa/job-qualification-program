import axios from "axios";

const api = axios.create({
  baseURL:
    "https://my-json-server.typicode.com/dossariwa/job-qualification-program",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTasks() {
    return api.get("/tasks");
  },
};
