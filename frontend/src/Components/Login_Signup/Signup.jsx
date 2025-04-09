import React from "react";
import styles from "./login.module.css";

const Signup = ({ toggleForm }) => {
  return (
    <div className={`${styles.col} ${styles.alignItemsCenter} ${styles.flexCol} ${styles.signIn}`}>
      <div className={`${styles.formWrapper} ${styles.alignItemsCenter}`}>
        <div className={`${styles.form} ${styles.signIn}`}>
          <div className={styles.inputGroup}>
            <i className="bx bxs-user"></i>
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.inputGroup}>
            <i className="bx bxs-lock-alt"></i>
            <input type="password" placeholder="Password" />
          </div>
          <button>Sign in</button>
          <p>
            <b>Forgot password?</b>
          </p>
          <p>
            <span>Don't have an account?</span>
            <b onClick={toggleForm} className={styles.pointer}>
              Sign up here
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;