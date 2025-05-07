import React, { useContext, useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { UserStore } from "@/Store/UserInfo.Store";
import fa from "fontawesome";

const UserProfile = () => {
  const { handleGetUserData } = useContext(UserStore);
  const [data, setUserData] = useState({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetUserData();
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.user_data}`}>
        <div className={styles.image}>
          <img src="/Images/userprofile/men1.png" alt="User Profile" />
          <div className={styles.name}>{data.name}</div>
          <div className={styles.contact}>
            <div className={styles.email}>{data.email}</div>
          </div>
        </div>
      </div>

      <div className={styles.item}>
        <h3>Health Information</h3>
        <div className={styles.healthInfo}>
          <p>
            <strong>Age:</strong> {data.age}
          </p>
          <p>
            <strong>Weight:</strong> {data.weight} kg
          </p>
          <p>
            <strong>Height:</strong> {data.height} cm
          </p>
        </div>
      </div>

      <div className={styles.item}>
        <h3>Health Status</h3>
        <ul className={styles.healthGoals}>
          <li className={styles.listIcon}>{data.dietaryPreference}</li>
          <li className={data.diabetes === true ? styles.listIcon : styles.listIconError}>
            Diabetes
          </li>
          <li className={data.bloodPressure === true ? styles.listIcon : styles.listIconError}>
            Blood Pressure
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
