import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import Signup from "./Signup";
import LoginContent from "./LoginContent";
import SignupContent from "./SignupContent";
import Login from "./Login";

const MainLoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const container = document.getElementById("container");
    setTimeout(() => {
      container.classList.add(styles.signIn);
    }, 200);
  }, []);

  const toggleForm = () => {
    const container = document.getElementById("container");
    container.classList.toggle(styles.signIn);
    container.classList.toggle(styles.signUp);
    setIsSignIn(!isSignIn);
  };

  return (
    <div className={styles.container} id="container">
      <div className={styles.row}>
        <Login toggleForm={toggleForm} />
        <Signup toggleForm={toggleForm} />
      </div>
      <div className={`${styles.row} ${styles.contentRow}`}>
        <LoginContent />
        <SignupContent />
      </div>
    </div>
  );
};

export default MainLoginPage;