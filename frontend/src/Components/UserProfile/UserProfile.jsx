import React, { useContext, useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { UserStore } from "@/Store/UserInfo.Store";
import { ClipLoader } from "react-spinners";

const UserProfile = () => {
  const { handleGetUserData } = useContext(UserStore);
  const [data, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetUserData();
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, []);

  const generateProfileSummary = (userData) => {
    const { age, weight, height, dietaryPreference, diabetes, bloodPressure } = userData;

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let bmiCategory = "";
    if (bmi < 18.5) bmiCategory = "underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) bmiCategory = "normal";
    else if (bmi >= 25 && bmi <= 29.9) bmiCategory = "overweight";
    else bmiCategory = "obese";

    // Start building the summary
    let summary = `At ${age} years old, you're doing well with your health journey! `;

    // Comment on BMI
    if (bmiCategory === "normal") {
      summary += `Your BMI of ${bmi.toFixed(1)} is in the normal range, which is great. `;
    } else if (bmiCategory === "underweight") {
      summary += `Your BMI of ${bmi.toFixed(1)} indicates you're underweight. Consider consulting a nutritionist to gain healthy weight. `;
    } else if (bmiCategory === "overweight") {
      summary += `Your BMI of ${bmi.toFixed(1)} suggests you're overweight. Adding some physical activity might help! `;
    } else {
      summary += `Your BMI of ${bmi.toFixed(1)} indicates obesity. A balanced diet and exercise plan could make a big difference. `;
    }

    // Comment on diet
    if (dietaryPreference) {
      summary += `Following a ${dietaryPreference.toLowerCase()} diet is a solid choice for your lifestyle. `;
    }

    // Comment on health conditions
    const conditions = [];
    if (diabetes) conditions.push("diabetes");
    if (bloodPressure) conditions.push("blood pressure");
    if (conditions.length === 0) {
      summary += `You have no major health conditions like diabetes or blood pressure, which is fantastic! `;
    } else {
      summary += `You're managing ${conditions.join(" and ")}, so regular check-ups are key to staying on track. `;
    }

    // Add a motivational message
    summary += `Keep up the great work, and stay consistent with your health goals!`;

    return summary;
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#695cfe" loading={true} size={60} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.userInfo}>
          <img src="/Images/userprofile/men1.png" alt="User Profile" className={styles.profileImage} />
          <h2 className={styles.name}>{data.name}</h2>
          <div className={styles.email}>{data.email}</div>
        </div>
        <div className={styles.summarySection}>
          <h3 className={styles.summaryTitle}>Profile Summary</h3>
          <p className={styles.summaryText}>
            {generateProfileSummary(data)}
          </p>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.healthInfo}>
          <h3>Health Information</h3>
          <div className={styles.infoList}>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Weight:</strong> {data.weight} kg</p>
            <p><strong>Height:</strong> {data.height} cm</p>
          </div>
        </div>

        <div className={styles.healthStatus}>
          <h3>Health Status</h3>
          <ul className={styles.statusList}>
            <li className={styles.listItem}>
              <span className={styles.listIcon}>✔️</span> {data.dietaryPreference}
            </li>
            <li className={data.diabetes ? styles.listItem : styles.listItemError}>
              <span className={styles.listIcon}>{data.diabetes ? "✔️" : "❌"}</span> Diabetes
            </li>
            <li className={data.bloodPressure ? styles.listItem : styles.listItemError}>
              <span className={styles.listIcon}>{data.bloodPressure ? "✔️" : "❌"}</span> Blood Pressure
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;