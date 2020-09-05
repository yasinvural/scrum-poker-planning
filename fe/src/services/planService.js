import { get, post } from "./baseService";

const baseURL = "http://localhost:4000";

const savePlanning = (data) => {
  const url = `${baseURL}/save-planning`;
  return post(url, data);
};

export { savePlanning };
