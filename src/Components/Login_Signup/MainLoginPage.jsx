import React, { useState, useEffect } from "react";
import "./Login.css";
import Signup from "./Signup";
import LoginContent from "./LoginContent";
import SignupContent from "./SignupContent";
import Login from "./Login";

const MainLoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const container = document.getElementById("container");
    setTimeout(() => {
      container.classList.add("sign-in");
    }, 200);
  }, []);

  const toggleForm = () => {
    const container = document.getElementById("container");
    container.classList.toggle("sign-in");
    container.classList.toggle("sign-up");
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="container" id="container">
      <div className="row">
        <Login toggleForm={toggleForm}/>
        <Signup toggleForm={toggleForm} />
      </div>
      <div className="row content-row">
        <LoginContent />
        <SignupContent />
      </div>
    </div>
  );
};

export default MainLoginPage;
