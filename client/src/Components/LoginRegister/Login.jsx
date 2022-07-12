import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";

const Login = ({ setUserLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8000/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.token) {
          console.log("response", response);
          localStorage.setItem("token", response.data.token);
          setUserLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={styles.componentLog}>
      <div className={styles.login}>
        <form autoComplete="off" onSubmit={login}>
          <h2>Login</h2>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.animated}
            type="submit"
            value="Login"
          ></input>
        </form>
        <Link to="/register">
          <span className={styles.forgot}>Don't have account?</span>
        </Link>
        <span className={styles.forgot}>Back to home page</span>
      </div>
    </div>
  );
};

export default Login;
