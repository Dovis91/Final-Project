import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import userlogo from "../images/User.png";
import alus from "../images/Alus.png";

const Navbar = ({ userLoggedIn, setUserLoggedIn, userName }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className={styles.navigation}>
      {userLoggedIn ? (
        <ul className={styles.menu}>
          <div className={styles.logoDiv}>
            <a href="../">
              <img src={alus} alt="formstack logo" className={styles.logo} />
            </a>
          </div>
          <div className={styles.btnDiv}>
            <Link to="create">
              <button className={styles.btnLoggedIn}>Create</button>
            </Link>
            <Link to="/" onClick={() => logout()}>
              <button className={styles.btnLoggedIn}>Logout</button>
            </Link>
            <div className={styles.userDiv}>
              <img src={userlogo} alt="useris" className={styles.userlogo} />
              <Link to="/userquestions">
                <h3 className={styles.username}>{userName}</h3>
              </Link>
            </div>
          </div>
        </ul>
      ) : (
        <ul className={styles.menu}>
          <div>
            <a href="../">
              <img src={alus} alt="formstack logo" className={styles.logo} />
            </a>
          </div>
          <div className={styles.body}>
            <div className={styles.btnDiv}>
              <Link to="login">
                <button className={styles.btnLoggedIn}>Login</button>
              </Link>

              <Link to="register">
                <button className={styles.btnLoggedIn}>Sing up</button>
              </Link>
            </div>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
