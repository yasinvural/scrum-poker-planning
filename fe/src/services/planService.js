import { get, post } from "./baseService";

const baseURL = "http://localhost:4000";

const savePlan = (data) => {
  const url = `${baseURL}/save-plan`;
  return post(url, data);
};

const getPlan = (sessionName) => {
  const url = `${baseURL}/get-plan?sessionName=${sessionName}`;
  return get(url);
};

export { savePlan, getPlan };
