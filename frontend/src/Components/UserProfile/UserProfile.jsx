import React from 'react';
import styles from './UserProfile.module.css';
import { useContext } from 'react';


const UserProfile = () => {


  // Example user data
  const user = {
    name: "Himanshu Sharma",
    email: "sharmahimanshuvdi@gmail.com",
    phone: "+91 9873125326",
    age: 28,
    weight: 75, // in kg
    height: 175, // in cm
    gender: "Male",
    dietaryPreference: "Vegetarian",
    healthGoals: ["Lose weight", "Improve stamina"],
  };

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const bmi = calculateBMI(user.weight, user.height);

  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.user_data}`}>
        <div className={styles.image}>
          <img src="./Images/userprofile/men1.png" alt="User Profile" />
          <div className={styles.name}>{user.name}</div>
          <div className={styles.contact}>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.phone}>{user.phone}</div>
          </div>
        </div>
      </div>

      <div className={styles.item}>
        <h3>Health Information</h3>
        <div className={styles.healthInfo}>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
          <p><strong>Height:</strong> {user.height} cm</p>
        </div>
      </div>

      <div className={styles.item}>
        <h3>Health Goals</h3>
        <ul className={styles.healthGoals}>
          {user.healthGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;