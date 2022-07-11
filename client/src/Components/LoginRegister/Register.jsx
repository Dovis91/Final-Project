import { Link } from "react-router-dom";
import "./Register.css";
const Register = () => {
  return (
    <div className="login">
      <form>
        <h2>Register</h2>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="email@email.com"
        />
        <input
          className="input"
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input className="animated" type="submit" value="Register"></input>
      </form>
      <Link to="/login">
        <span className="forgot">Already have an account?</span>
      </Link>
      <span className="forgot">Back to home page</span>
    </div>
  );
};

export default Register;
