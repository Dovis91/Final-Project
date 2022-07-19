import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/LoginRegister/Register";
import Login from "./Components/LoginRegister/Login";
import Home from "./Components/Home/Home";
import Create from "./Components/Create/Create";
import SingleQuestion from "./Components/SingleQuestion/SingleQuestion";
import UserQuestions from "./Components/UserQuestions/UserQuestions";

function App() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const userId = localStorage.getItem("user_id");
    if (token && userName && userId) {
      setUserLoggedIn(true);
      setUserName(userName);
      setUserId(userId);
    }
  }, [navigate]);

  return (
    <div className="App">
      <Navbar
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
        userName={userName}
      />
      <Routes>
        <Route path="/" element={<Home userLoggedIn={userLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              setUserLoggedIn={setUserLoggedIn}
              setUserName={setUserName}
            />
          }
        />
        <Route path="/create" element={<Create />} />
        <Route
          path="/questions/:id"
          element={
            <SingleQuestion userLoggedIn={userLoggedIn} userId={userId} />
          }
        />
        <Route path="/userquestions" element={<UserQuestions />} />
      </Routes>
    </div>
  );
}

export default App;
