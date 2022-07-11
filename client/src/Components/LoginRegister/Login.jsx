import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <div className="login">
      <form>
        <h2>Login</h2>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="example@example.com"
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input className="animated" type="submit" value="Login"></input>
      </form>
      <Link to="/register">
        <span className="forgot">Don't have account?</span>
      </Link>
      <span className="forgot">Back to home page</span>
    </div>
  );
};

export default Login;
