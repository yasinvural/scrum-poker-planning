import axios from "axios";

const get = (url) => {
  try {
    return axios.get(url);
  } catch (err) {
    throw new Error(err);
  }
};

const post = (url, data) => {
  try {
    return axios.post(url, data);
  } catch (err) {
    throw new Error(err);
  }
};

export { get, post };
