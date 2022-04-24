import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";

import "./LoginPage.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userServices } from "../../services/User";
import User from "../../interfaces/User";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import { SnackbarOptions } from "../../interfaces/SnackbarOptions";
import { Storage } from "../../utils/Storage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    visible: false,
    message: "",
  });

  const authenticatedUser = sessionStorage.getItem("authenticatedUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticatedUser) navigate("/");
  }, []);

  useEffect(() => {
    let emailRegex = /\S+@\S+\.\S+/;
    values.email && setIsEmailValid(emailRegex.test(values.email));
  }, [values.email]);

  useEffect(() => {
    !isEmailValid &&
      setSnackbarOptions({
        visible: true,
        message: "Digite um e-mail válido",
        severity: "error",
      });
  }, [isEmailValid]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    userServices.login().then(({ data }) => {
      const { password, id, ...userFound } = data.filter(
        (user: User) =>
          user.email === values.email && user.password === values.password
      );
      if (userFound[0]) {
        Storage.set("authenticatedUser", userFound[0]);
        navigate("/");
      } else {
        setSnackbarOptions({
          visible: true,
          message: "Nenhum usuário encontrado com estas credenciais",
          severity: "error",
        });
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOptions({ visible: false, message: "" });
  };

  return (
    <div className="login-container">
      <section className="login-box">
        <section className="form">
          <div className="product-container">
            <img
              src="/assets/logo_blue.svg"
              width="154px"
              alt="PayFriends logo"
              style={{ marginBottom: "18px" }}
            />
            <span data-testid="welcome-text" className="welcome-text">
              Bem-vindo de volta
            </span>
          </div>
          <TextField
            id="login-input"
            data-testid="email-input"
            type="email"
            error={!isEmailValid}
            label="Email"
            value={values.email}
            onChange={({ target: { value } }) =>
              setValues({ ...values, email: value })
            }
            variant="outlined"
          />
          <OutlinedInput
            id="psswd-input"
            data-testid="password-input"
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            sx={{ marginTop: "28px" }}
            value={values.password}
            onChange={({ target: { value } }) =>
              setValues({ ...values, password: value })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  data-testid="show-password-button"
                  onMouseDown={handleClickShowPassword}
                  onMouseUp={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <Button
            variant="contained"
            data-testid="login-button"
            type="submit"
            disabled={!values.email || !values.password}
            onClick={handleLogin}
            sx={{
              marginTop: "36px",
              height: "36px",
              padding: "10px 14px",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
            }}
          >
            Entrar
          </Button>
        </section>
      </section>

      <section className="loginLogo-container">
        <img
          src="/assets/login_payment.svg"
          className="logo"
          alt="Man doing payment via cellphone"
        />
      </section>

      <CustomSnackbar
        snackbarOptions={snackbarOptions}
        handleClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default Login;
