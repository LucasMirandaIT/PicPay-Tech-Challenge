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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarOptions, setSnackbarOptions] = useState({
    visible: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({ mode: "onBlur" });

  const authenticatedUser = sessionStorage.getItem("authenticatedUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticatedUser) navigate("/");
  }, []);

  useEffect(() => {
    if (!errors.email && !errors.password) return;
    if (errors?.email?.type === "pattern") {
      setSnackbarOptions({ visible: true, message: "Digite um e-mail válido" });
    }
    if (
      errors?.email?.type === "required" ||
      errors?.password?.type === "required"
    ) {
      setSnackbarOptions({
        visible: true,
        message: "Preencha todos os campos obrigatórios",
      });
    }
  }, [errors.email, errors.password]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (loginData: any) => {
    userServices.login(loginData, () => navigate("/"));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOptions({ visible: false, message: "" });
  };

  return (
    <div className="login-container">
      <section className="login-box">
        <form className="form" noValidate onSubmit={handleSubmit(handleLogin)}>
          <div className="product-container">
            <img
              src="/assets/logo_blue.svg"
              width="154px"
              alt="PayFriends logo"
              style={{ marginBottom: "18px" }}
            />
            <span className="welcome-text">Bem-vindo de volta</span>
          </div>
          <TextField
            id="login-input"
            data-testid="email-input"
            type="email"
            error={errors?.email ? true : false}
            label="Email"
            {...register("email", {
              required: true,
              pattern: /\S+@\S+\.\S+/,
            })}
            variant="outlined"
          />
          <OutlinedInput
            id="psswd-input"
            data-testid="password-input"
            placeholder="Senha"
            // onChange={({ target: { value } }) => setPassword(value)}
            error={errors?.password ? true : false}
            type={showPassword ? "text" : "password"}
            sx={{ marginTop: "28px" }}
            {...register("password", { required: true })}
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
            // onClick={handleLogin}
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
        </form>
      </section>

      <section className="loginLogo-container">
        <img
          src="/assets/login_payment.svg"
          className="logo"
          alt="Man doing payment via cellphone"
        />
      </section>

      <CustomSnackbar snackbarOptions={snackbarOptions} handleClose={handleCloseSnackbar} />
    </div>
  );
};

export default Login;
