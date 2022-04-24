import axios from "axios";
import User from "../interfaces/User";
import { Storage } from "../utils/Storage";

interface LoginData {
  email: string;
  password: string;
}

export const userServices = {
  login: () => {
    return axios.get("http://localhost:3030/account");
  },
};
