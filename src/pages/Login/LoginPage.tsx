import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";

import "./LoginPage.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userServices } from "../../services/User";
import User from "../../interfaces/User";
import { useForm } from "react-hook-form";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import { SnackbarOptions } from "../../interfaces/SnackbarOptions";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    email && setIsEmailValid(emailRegex.test(email));
  }, [email]);

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
    // userServices.login({ email, password }, () => navigate("/"));
    userServices.login({ email, password }, (event: string) => {
      if (event === "success") navigate("/");
      setSnackbarOptions({ visible: true, message: event, severity: "error" });
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
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            variant="outlined"
          />
          <OutlinedInput
            id="psswd-input"
            data-testid="password-input"
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            sx={{ marginTop: "28px" }}
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
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
            disabled={!email || !password}
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
