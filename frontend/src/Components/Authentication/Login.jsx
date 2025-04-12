import React from "react";
import styles from "./Login.module.css";
import { Link, NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.main}>
    <div className={styles.container}>
      <h1 className={styles.heading}>Login To Smart Eats</h1>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            className={styles.input}
            placeholder="Email or username"
            aria-label="Email or username"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <i className="fas fa-lock"></i>
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            aria-label="Password"
            required
          />
        </div>

        <button className={styles.loginBtn}>LOG IN</button>

        <p className={styles.registerText}>
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </p>

        <div className={styles.divider}>OR CONTINUE WITH</div>

        <div className={styles.socialButtons}>
          <button className={styles.googleBtn}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
