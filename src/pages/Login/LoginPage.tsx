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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticatedUser = sessionStorage.getItem("authenticatedUser");
  const navigate = useNavigate();


  useEffect(() => {
    if (authenticatedUser) navigate("/");
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    userServices.login({ email, password }, () => navigate("/"));
  };

  return (
    <div className="login-container">
      <section className="login-box">
        <div className="form">
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
            label="Email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            variant="outlined"
          />
          <OutlinedInput
            id="psswd-input"
            data-testid="password-input"
            placeholder="Senha"
            onChange={({ target: { value } }) => setPassword(value)}
            type={showPassword ? "text" : "password"}
            sx={{ marginTop: "28px" }}
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
        </div>
      </section>

      <section className="loginLogo-container">
        <img
          src="/assets/login_payment.svg"
          className="logo"
          alt="Man doing payment via cellphone"
        />
      </section>
    </div>
  );
};

export default Login;
