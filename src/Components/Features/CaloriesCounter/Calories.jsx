import React, { useState } from "react";
import styles from "./Calories.module.css"; 
// import HealthySaladPage from "./HealthySaladPage";

export const Calories = () => {
  const [calories, setCalories] = useState(500);   
  const [carbs, setCarbs] = useState(150);         
  const [protein, setProtein] = useState(60);      
  const [fats, setFats] = useState(30);            
  const [searchQuery, setSearchQuery] = useState(""); 

  const maxCalories = 2000;
  const maxCarbs = 250;
  const maxProtein = 150;
  const maxFats = 70;

  const calculatePercentage = (value, max) => {
    return (value / max) * 100;
  };

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', options);
  };

  const getLastSevenDays = () => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.getDate());
    }
    return dates.reverse();
  };

  const isGoalMet = (value, max) => {
    return value >= max;
  };

  const dates = getLastSevenDays();
  const currentDate = getCurrentDate();

  return (
    <div className={styles.outermaxContainer}>
      <div className={styles.outermax2Container}>
        <div className={styles.upperContainer}>
          <div className={styles.leftContainer}>
            <h3 className={styles.grey}>Stay On Track!</h3>
            <h1 className={styles.green}>Calorie Tracker</h1>
            <h3 className={styles.grey}>Today's Date: {currentDate}</h3>

            <input
              type="text"
              className={styles.searchbar}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.rightContainer}>
            {/* <h2 className={styles.green2}>Today's Progress</h2> */}

                {/* <div className={styles.circles}>
                {[{ label: "Calories", value: calories, max: maxCalories, color: "#7FFF00" },
                    { label: "Carbs", value: carbs, max: maxCarbs, color: "#FF6347" },
                    { label: "Protein", value: protein, max: maxProtein, color: "#1E90FF" },
                    { label: "Fats", value: fats, max: maxFats, color: "#FFD700" }].map((item, index) => (
                    <div key={index} className={styles.circle}>
                        <div
                        className={styles.circleInner}
                        style={{
                            background: `conic-gradient(${item.color} ${calculatePercentage(
                            item.value,
                            item.max
                            )}%, #40414f 0%)`,
                        }}
                        >
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.value}>{item.value} {item.label === "Calories" ? "kcal" : "g"}</span>
                        </div>
                    </div>
                    ))}
                </div> */}
          </div>
        </div>

        <div className={styles.dateLine}>
          {dates.map((date, index) => (
            <span
              key={index}
              className={`${styles.dateItem} ${isGoalMet(calories, maxCalories) ? styles.goalMet : styles.goalNotMet}`}
            >
              {date}
            </span>
          ))}
        </div>

        <div className={styles.recipeSection}>
          <h2 className={styles.green2}>Healthy Recipes</h2>
          <div className={styles.recipeCards}>
            {[{
              title: "Healthy Salad",
              image: "/Images/salad.jpeg",
              calories: 450,
              carbs: 60,
              protein: 25,
              fats: 17
            },
            {
              title: "Chickpea Curry",
              image: "/Images/curry.jpeg",
              calories: 275,
              carbs: 60,
              protein: 8,
              fats: 25
            },
            {
              title: "Veg Tikka Masala",
              image: "/Images/tikka.jpeg",
              calories: 221,
              carbs: 16,
              protein: 16,
              fats: 14
            }].map((recipe, index) => (
              <div key={index} className={styles.recipeCard}>
                <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
                <div className={styles.recipeDetails}>
                  <h4>{recipe.title}</h4>
                  <p>Calories: {recipe.calories} kcal</p>
                  <p>Carbs: {recipe.carbs}g</p>
                  <p>Protein: {recipe.protein}g</p>
                  <p>Fats: {recipe.fats}g</p>
                  <button className={styles.recipeButton}>Recipe!</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
