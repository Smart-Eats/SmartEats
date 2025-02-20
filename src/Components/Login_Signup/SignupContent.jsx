import React from "react";
import styles from "./login.module.css";

const SignupContent = () => {
  return (
    <div className={`${styles.col} ${styles.alignItemsCenter} ${styles.flexCol}`}>
      <div className={`${styles.img} ${styles.signUp}`}></div>
      <div className={`${styles.text} ${styles.signUp}`}>
        <h2>Join with us</h2>
      </div>
    </div>
  );
};

export default SignupContent;