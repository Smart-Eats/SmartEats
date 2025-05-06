import React, { useEffect, useState } from "react";
import styles from "./BMI2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BMI2 = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState("");
  const[gender,setGender] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/data/bmi-user-data`, {
          withCredentials: true,
        });
        // console.log(response.data);
        const { name, gender,age,height,weight} = response.data;
        // console.log(name);
        // console.log(gender);
        setHeight(height);
        setWeight(weight);
        setName(name);
        setGender(gender);
      } catch (error) {
        console.error("Error fetching BMI data", error);
        alert("There was an error fetching user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  const calculateBmi = () => {
    const heightM = height/100;
    const bmi = weight/(heightM*heightM);
    return bmi;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.welcomeMessage}>
          <h2>
            Welcome, <span>{name}</span> 👋
          </h2>
        </div>
        <div className={styles.images}>
          {/* <img src="/Images/BMI/girl_bmi.png" alt="BMI Illustration" /> */}
          {gender==='female'?<img src="/Images/BMI/girl_bmi.png" alt="BMI Illustration" />:<img src="/Images/BMI/men_bmi.png" alt="BMI Illustration" />}
        </div>
        <div className={styles.ranges}>
          <div className={styles.rangeContainer}>
            <label>Height: {height} cm</label>
            <input
              type="range"
              min="100"
              max="220"
              value={height}
              // readOnly
              disabled
            />
          </div>
          <div className={styles.rangeContainer}>
            <label>Weight: {weight} kg</label>
            <input
              type="range"
              min="30"
              max="200"
              value={weight}
              // readOnly
              disabled
            />
          </div>
        </div>
        <div className={styles.forward}>
          <button
            onClick={() => {
              const bmi = calculateBmi();
              navigate("/layout/bmi-calculator/select/result", {state:{bmi,gender}});

            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BMI2;
