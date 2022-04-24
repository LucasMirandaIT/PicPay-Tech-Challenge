import axios from "axios";

export const userServices = {
  login: () => {
    return axios.get("http://localhost:3030/account");
  },
};
