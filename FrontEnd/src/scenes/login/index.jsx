import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // para exibir erro

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

 const handleSubmit = (event) => {
  event.preventDefault();

  const validEmail = "admin@gmail.com";
  const validPassword = "123456";

  if (username.toLowerCase() === validEmail && password === validPassword) {
    const userData = {
      username,
      email: username,
    };

    login(userData);
    setErrorMessage("");
    navigate("/dashboard");
  } else {
    setErrorMessage("E-mail ou senha incorretos.");
  }
};

  return (
    <div className="login-page-wrapper"
      style={{
    overflow: 'hidden',
    position: 'fixed', // Isso trava a viewport
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
    }}
>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#">Esqueceu sua senha?</a>
          </div>

          <button type="submit">Login</button>

          <div className="signup-link">
            <p>
              Não tem uma conta? <a href="/cadastro">Registrar</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
