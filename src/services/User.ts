import axios from "axios";
import User from "../interfaces/User";
import { Storage } from "../utils/Storage";

interface LoginData {
  email: string;
  password: string;
}

export const userServices = {
  login: (loginData: LoginData, handleCallback: (event: string) => void) => {
    axios.get("http://localhost:3030/account").then(({ data }) => {
      const { password, id, ...userFound } = data.filter(
        (user: User) =>
          user.email === loginData.email && user.password === loginData.password
      );
      if (userFound[0]) {
        Storage.set("authenticatedUser", userFound);
        handleCallback("success");
      } else {
        handleCallback("Nenhum usuário encontrado com estas credenciais");
      }
    });
  },
  logout: () => {},
};
