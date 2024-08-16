import axios from "axios";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global/",
});
