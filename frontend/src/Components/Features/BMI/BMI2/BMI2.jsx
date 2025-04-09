import React, { useState } from "react";
import styles from "./BMI2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BMI2 = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);

  return (
    <div className={styles.container}>
      <div className={styles.backBtn} onClick={()=>{navigate(-1)}}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      {/* <div className={styles.heading}>
        <h1>Your Height and Weight</h1>
      </div> */}
      <div className={styles.images}>
        <img src="/Images/BMI/girl_bmi.png" alt="BMI Illustration" />
      </div>
      <div className={styles.ranges}>
        <div className={styles.rangeContainer}>
          <label>Height: {height} cm</label>
          <input
            type="range"
            min="100"
            max="220"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className={styles.rangeContainer}>
          <label>Weight: {weight} kg</label>
          <input
            type="range"
            min="30"
            max="200"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.forward}>
        <button onClick={()=>{navigate("/bmiCalculator/select/result")}}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default BMI2;
