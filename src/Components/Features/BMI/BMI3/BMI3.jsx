import React, { useState } from "react";
import styles from "./BMI3.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BMI3 = () => {
  const [bmi, setBmi] = useState(21);

  return (
    <div className={styles.container}>
      <div className={styles.backBtn}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className={styles.imageWrapper}>
        <img src="./Images/popper.gif" alt="Background Animation" className={styles.popper} />
        <img src="./Images/BMI/girl_bmi.png" alt="BMI Illustration" className={styles.girlImage} />
      </div>
      <div className={styles.status}>
        <h3>Your BMI is {bmi}</h3>
      </div>
      <div className={styles.sliderContainer}>
        <label>BMI: {bmi}</label>
        <input
          type="range"
          min="10"
          max="40"
          value={bmi}
          className={styles.bmiSlider}
          readOnly
        />
      </div>
    </div>
  );
};

export default BMI3;
