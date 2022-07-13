import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userLoggedIn, setUserLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={styles.navigation}>
      {userLoggedIn ? (
        <ul className={styles.menu}>
          <div>
            <img
              src="https://seeklogo.com/images/F/formstack-logo-D5787F63EE-seeklogo.com.png"
              alt="formstack logo"
              className={styles.logo}
            />
          </div>
          <div className={styles.body}>
            <div className={styles.button}>
              <Link to="create">
                <li>Add Question</li>
              </Link>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.button}>
              <Link to="/" onClick={() => logout()}>
                <li>Logout</li>
              </Link>
            </div>
          </div>
        </ul>
      ) : (
        <ul className={styles.menu}>
          <div>
            <img
              src="https://seeklogo.com/images/F/formstack-logo-D5787F63EE-seeklogo.com.png"
              alt="formstack logo"
              className={styles.logo}
            />
          </div>
          <div className={styles.body}>
            <div className={styles.button}>
              <Link to="login">
                <li>Login</li>
              </Link>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.button}>
              <Link to="register">
                <li>Register</li>
              </Link>
            </div>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
