import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul class="menu">
        <div>
          <img
            src="https://seeklogo.com/images/F/formstack-logo-D5787F63EE-seeklogo.com.png"
            alt="formstack logo"
            className="logo"
          />
        </div>
        <li>
          {" "}
          <a href="/login">Login</a>
        </li>
        <li>
          {" "}
          <a href="/Register">Register</a>
        </li>
      </ul>
      {/* <ul class="menu">
        <div>
          <img
            src="https://seeklogo.com/images/F/formstack-logo-D5787F63EE-seeklogo.com.png"
            alt="formstack logo"
            className="logo"
          />
        </div>
        <li>
          <a href="" onclick="logout()">
            Logout
          </a>
        </li>
        <li>
          <a href="/addblog">Add Article</a>
        </li>
        <li>
          <a href="/userarticles">User:</a>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
