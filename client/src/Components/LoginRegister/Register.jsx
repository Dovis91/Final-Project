import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registration = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8000/register",
        {
          email: email,
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        navigate("/login");
      })
      .catch((error) => error.response.data.message);
  };

  return (
    <div className={styles.componentReg}>
      <div className={styles.login}>
        <form autoComplete="off" onSubmit={registration}>
          <h2>Register</h2>
          <input
            className={styles.inputRegLog}
            type="email"
            name="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.inputRegLog}
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.inputRegLog}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.animated}
            type="submit"
            value="Register"
          ></input>
        </form>
        <Link to="/login">
          <span className={styles.forgot}>Already have an account?</span>
        </Link>
        <Link to="/">
          <span className={styles.forgot}>Back to home page</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
