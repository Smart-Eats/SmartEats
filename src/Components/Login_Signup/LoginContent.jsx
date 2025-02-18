import React from "react";
import styles from "./login.module.css";

const LoginContent = () => {
  return (
    <div className={`${styles.col} ${styles.alignItemsCenter} ${styles.flexCol}`}>
      <div className={`${styles.text} ${styles.signIn}`}>
        <h2>Welcome</h2>
      </div>
      <div className={`${styles.img} ${styles.signIn}`}></div>
    </div>
  );
};

export default LoginContent;