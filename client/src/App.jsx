import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/LoginRegister/Register";
import Login from "./Components/LoginRegister/Login";
import Home from "./Components/Home/Home";
import Create from "./Components/Create/Create";

function App() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserLoggedIn(true);
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Navbar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      <Routes>
        <Route path="/" element={<Home userLoggedIn={userLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setUserLoggedIn={setUserLoggedIn} />}
        />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
