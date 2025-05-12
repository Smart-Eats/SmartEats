import React, { useContext, useEffect, useState } from "react";
import styles from "./BMI2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UserStore } from "@/Store/UserInfo.Store";
import { ClipLoader } from "react-spinners";


const BMI2 = () => {
  const navigate = useNavigate();
  const[data,setUserData] = useState({ height: 160, weight: 60, gender: "male", name: "User" });
  const [loading, setLoading] = useState(true);
  // ! i have created a store userstore where all the data of user is comming
  const{handleGetUserData} = useContext(UserStore);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await handleGetUserData();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setTimeout(()=>{
          setLoading(false);
        },2000)
        
      }
    };
    fetchData();
  }, []);
  const calculateBmi = () => {
    const heightM = data.height/100;
    const bmi = data.weight/(heightM*heightM);
    return bmi;
  }

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#695cfe" loading={true} size={60} />
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.welcomeMessage}>
          <h2>
            Welcome, <span>{data.name}</span> 👋
          </h2>
        </div>
        <div className={styles.images}>
          {/* <img src="/Images/BMI/girl_bmi.png" alt="BMI Illustration" /> */}
          {data.gender==='female'?<img src="/Images/BMI/girl_bmi.png" alt="BMI Illustration" />:<img src="/Images/BMI/men_bmi.png" alt="BMI Illustration" />}
        </div>
        <div className={styles.ranges}>
          <div className={styles.rangeContainer}>
            <label>Height: {data.height} cm</label>
            <input
              type="range"
              min="100"
              max="220"
              value={data.height}
              // readOnly
              disabled
            />
          </div>
          <div className={styles.rangeContainer}>
            <label>Weight: {data.weight} kg</label>
            <input
              type="range"
              min="30"
              max="200"
              value={data.weight}
              // readOnly
              disabled
            />
          </div>
        </div>
        <div className={styles.forward}>
          <button
            onClick={() => {
              const bmi = calculateBmi();
              navigate("/layout/bmi-calculator/select/result", {state:{bmi,gender:data.gender}});

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
