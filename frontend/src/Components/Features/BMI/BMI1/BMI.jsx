import React from 'react'
import styles from './BMI.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
const BMI = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Choose One</h1>
      </div>
      <div className={styles.images}>
        <img src="./Images/BMI/girl_bmi.png" alt="" srcset="" />
        <img src="./Images/BMI/men_bmi.png" alt="" srcset="" />
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={()=>{navigate("/bmiCalculator/select")}}>Female</button>
        <button type='button' onClick={()=>{navigate("/bmiCalculator/select")}}>Male</button>
      </div>
      <div className={styles.forward}>
        {/* <button>
        <FontAwesomeIcon icon={faArrowRight} />
        </button> */} 
      </div>
    </div>
  )
}

export default BMI