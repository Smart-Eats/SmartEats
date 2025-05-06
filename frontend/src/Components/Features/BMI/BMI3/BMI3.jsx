import React, { useState } from "react";
import styles from "./BMI3.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const BMI3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bmi, gender } = location.state;
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight";
    else if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    else return "Obese";
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.backBtn}
        onClick={() => {
          navigate(-1);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className={styles.imageWrapper}>
        {/* <img
          src="/Images/popper.gif"
          alt="Background Animation"
          className={styles.popper}
        /> */}
        {getBmiCategory(bmi)==='Normal weight' ?  <img src="/Images/popper.gif"alt="Background Animation"className={styles.popper}/> : " " }
        {/* <img src="/Images/BMI/girl_bmi.png" alt="BMI Illustration" className={styles.girlImage} /> */}
        {gender === "female" ? (
          <img
            src="/Images/BMI/girl_bmi.png"
            alt="BMI Illustration"
            className={styles.girlImage}
          />
        ) : (
          <img
            src="/Images/BMI/men_bmi.png"
            alt="BMI Illustration"
            className={styles.girlImage}
          />
        )}
      </div>
      <div className={styles.status}>
        <h3>Your BMI is {bmi.toFixed(2)}</h3>
        <p className={styles.category}>
          Category: <strong>{getBmiCategory(bmi)}</strong>
        </p>
      </div>

      <div className={styles.sliderContainer}>
        <label>BMI: {bmi.toFixed(2)}</label>
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
