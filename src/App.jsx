import React, { useState } from "react";
import "./App.css"; 
import HealthySaladPage from "./HealthySaladPage";
import { Routes, Route, Link } from 'react-router-dom';

export const App = () => {
  const [calories, setCalories] = useState(500);   
  const [carbs, setCarbs] = useState(150);         
  const [protein, setProtein] = useState(60);      
  const [fats, setFats] = useState(30);            
  const [searchQuery, setSearchQuery] = useState(""); 

  // Maximum daily intake values (can be dynamic based on user goals)
  const maxCalories = 2000;
  const maxCarbs = 250;
  const maxProtein = 150;
  const maxFats = 70;

  // Function to calculate progress percentage
  const calculatePercentage = (value, max) => {
    return (value / max) * 100;
  };

  // Function to get the current date in a readable format
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', options);
  };

  // Function to get the past 7 days as date strings (only day number)
  const getLastSevenDays = () => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.getDate()); // Push only the day number
    }
    return dates.reverse(); // To show the dates from oldest to newest
  };

  // Function to check if the goal is met
  const isGoalMet = (value, max) => {
    return value >= max;
  };

  const dates = getLastSevenDays();
  const currentDate = getCurrentDate();  // Get today's date

  return (
    <div className="outermaxContainer">
      <div className="outermax2Container">
        <div className="upperContainer">
          <div className="leftContainer">
            <h3 className="grey">Stay On Track!</h3>
            <h1 className="green">Calorie Tracker</h1>
            <h3 className="grey">Today's Date: {currentDate}</h3> {/* Displaying today's real date */}

            {/* Search bar below the "Real Time and Date" */}
            <input
              type="text"
              className="searchbar"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Handle input change
            />
          </div>
          <div className="rightContainer">
            <h2 className="green2">Today's Progress</h2>

            <div className="circles">
              {/* Calories Circle */}
              <div className="circle">
                <div
                  className="circle-inner"
                  style={{
                    background: `conic-gradient(#7FFF00 ${calculatePercentage(
                      calories,
                      maxCalories
                    )}%, #40414f 0%)`,
                  }}
                >
                  <span className="label">Calories</span>
                  <span className="value">{calories} kcal</span>
                </div>
              </div>

              {/* Carbs Circle */}
              <div className="circle">
                <div
                  className="circle-inner"
                  style={{
                    background: `conic-gradient(#FF6347 ${calculatePercentage(
                      carbs,
                      maxCarbs
                    )}%, #40414f 0%)`,
                  }}
                >
                  <span className="label">Carbs</span>
                  <span className="value">{carbs}g</span>
                </div>
              </div>

              {/* Protein Circle */}
              <div className="circle">
                <div
                  className="circle-inner"
                  style={{
                    background: `conic-gradient(#1E90FF ${calculatePercentage(
                      protein,
                      maxProtein
                    )}%, #40414f 0%)`,
                  }}
                >
                  <span className="label">Protein</span>
                  <span className="value">{protein}g</span>
                </div>
              </div>

              {/* Fats Circle */}
              <div className="circle">
                <div
                  className="circle-inner"
                  style={{
                    background: `conic-gradient(#FFD700 ${calculatePercentage(
                      fats,
                      maxFats
                    )}%, #40414f 0%)`,
                  }}
                >
                  <span className="label">Fats</span>
                  <span className="value">{fats}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add more components below */}
        <div className="additionalContent">
          <h3 className="grey">Other Components Below</h3>
        </div>

        {/* Horizontal Date Line */}
        <div className="dateLine">
          {dates.map((date, index) => (
            <span
              key={index}
              className={`dateItem ${isGoalMet(calories, maxCalories) ? "goalMet" : "goalNotMet"}`}
            >
              {date}
            </span>
          ))}
        </div>

        {/* Recipe Cards Section */}
        <div className="recipeSection">
          <h2 className="green2">Healthy Recipes</h2>
          <div className="recipeCards">
            <div className="recipeCard">
              <img
                src="https://www.eatingwell.com/thmb/IE8HoDhUX8TW2LiihYZgK3GCIVw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Chaat-Inspired-Salad-Beauty-Overhead-1x1-1056f97dc2b645f2839864ca469be4ca.jpg" // Replace with actual image URL
                alt="Recipe 1"
                className="recipeImage"
              />
              <div className="recipeDetails">
                <h4>Healthy Salad</h4>
                <p>Calories: 450 kcal</p>
                <p>Carbs: 60g</p>
                <p>Protein: 25g</p>
                <p>Fats: 17g</p>
                <button className="recipeButton">Recipe!</button> {/* Button for recipe */}
              </div>
            </div>
            <div className="recipeCard">
              <img
                src="https://www.eatingwell.com/thmb/J0KZjZKv9J-FtLDxHUgQcnk0hds=/364x242/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chickpea-curry-chhole-3x2-d05b7bfb639c42a89d7afb4065ff4635.jpg"
                alt="Recipe 2"
                className="recipeImage"
              />
              <div className="recipeDetails">
                <h4>Chickpea Curry</h4>
                <p>Calories: 275 kcal</p>
                <p>Carbs: 60g</p>
                <p>Protein: 8g</p>
                <p>Fats: 25g</p>
                <button className="recipeButton">Recipe!</button> {/* Button for recipe */}
              </div>
            </div>
            <div className="recipeCard">
              <img
                src="https://www.eatingwell.com/thmb/GzA2VfmmitxBaYhtWcm0KKLj-YE=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4257410-d532749fc6d2428194fa6497a8185c5f.jpg"
                alt="Recipe 3"
                className="recipeImage"
              />
              <div className="recipeDetails">
                <h4>Veg Tikka Masala</h4>
                <p>Calories: 221 kcal</p>
                <p>Carbs: 16g</p>
                <p>Protein: 16g</p>
                <p>Fats: 14g</p>
                <button className="recipeButton">Recipe!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
