import React from "react";
import styles from "./login.module.css";

const Login = ({ toggleForm }) => {
  return (
    <div className={`${styles.col} ${styles.alignItemsCenter} ${styles.flexCol} ${styles.signUp}`}>
      <div className={`${styles.formWrapper} ${styles.alignItemsCenter}`}>
        <div className={`${styles.form} ${styles.signUp}`}>
          <div className={styles.inputGroup}>
            <i className="bx bxs-user"></i>
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.inputGroup}>
            <i className="bx bx-mail-send"></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className={styles.inputGroup}>
            <i className="bx bxs-lock-alt"></i>
            <input type="password" placeholder="Password" />
          </div>
          <div className={styles.inputGroup}>
            <i className="bx bxs-lock-alt"></i>
            <input type="password" placeholder="Confirm password" />
          </div>
          <button>Sign up</button>
          <p>
            <span>Already have an account?</span>
            <b onClick={toggleForm} className={styles.pointer}>
              Sign in here
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;