import { get, post } from "./baseService";

const baseURL = "http://localhost:4000";

const createPlan = (data) => {
  const url = `${baseURL}/create-plan`;
  return post(url, data);
};

const getPlanBySessionName = (sessionName) => {
  const url = `${baseURL}/get-plan?sessionName=${sessionName}`;
  return get(url);
};

export { createPlan, getPlanBySessionName };
