// HealthySaladPage.js
import React from 'react';
import './HealthySaladPage.css'; // Create a new CSS file for this page

const HealthySaladPage = () => {
  return (
    <div className="recipePageContainer">
      <h1 className="recipeTitle">Healthy Salad Recipe</h1>
      <h2 className="sectionTitle">Ingredients:</h2>
      <ul className="ingredientsList">
        <li>1/2 cup cooked French green lentils</li>
        <li>1 small green or red bell pepper, finely diced</li>
        <li>1 large English cucumber or 3 Persian cucumbers, finely diced</li>
        <li>1 jalapeño pepper, seeded (if desired), and finely diced (optional)</li>
        <li>2/3 cup cooked corn kernels, thawed if frozen</li>
        <li>1 cup puffed quinoa (see Tip)</li>
        <li>1/4 cup tamarind-date chutney (see Tip)</li>
        <li>2 tablespoons coriander chutney</li>
        <li>1/2 cup finely chopped Roma or cherry tomatoes</li>
        <li>1/3 cup finely chopped red onion</li>
        <li>1/4 cup finely chopped fresh cilantro</li>
        <li>1/3 cup unsalted roasted peanuts</li>
      </ul>

      <h2 className="sectionTitle">Directions:</h2>
      <p>
        Evenly divide lentils, bell pepper, cucumber, jalapeño (if using), corn, and quinoa between two bowls. Drizzle with tamarind-date chutney and coriander chutney. Top with tomatoes, onion, cilantro, and peanuts.
      </p>

      <button className="backButton" onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default HealthySaladPage;
