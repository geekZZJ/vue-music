import {API} from "./config";
import axios from "axios";

export const GET = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: API + url,
      params,
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};
