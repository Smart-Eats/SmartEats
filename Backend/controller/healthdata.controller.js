import { user } from "../model/user.model.js";
import { Harmful_Ingredients } from "../model/harmful_Ingredients.model.js";
export const HEALTH_DATA_FORM = async (req, res) => {
  try {
    const { email } = req.user;
    const {
      age,
      height,
      weight,
      gender,
      diabetes,
      bloodPressure,
      dietaryPreference,
    } = req.body;
    const updatedUser = await user.findOneAndUpdate(
      { email },
      {
        $set: {
          "healthData.age": age,
          "healthData.weight": weight,
          "healthData.height": height,
          "healthData.gender": gender,
          "healthData.diabetes": diabetes,
          "healthData.bloodPressure": bloodPressure,
          "healthData.dietaryPreference": dietaryPreference,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    res.status(200).json({
      success: true,
      message: "Health profile saved successfully",
      healthProfile: updatedUser.healthData,
    });
  } catch (error) {
    console.error("Error updating health profile:", error);
    res
      .status(500)
      .json({ message: "Server error while updating health data" });
  }
};

export const ANALYZE_RESULT = async (req, res) => {
  try {
    const { ocrIngredents } = req.body;
    const{ id } = req.user;
    const USER = await user.findById(id); // Get user
    if (!USER) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // i have document Harmful_Ingredients inside this i have all ingredients
    const harmfulDocument = await Harmful_Ingredients.findOne(); 
    const harmfulIngredients = harmfulDocument.ingredients;
    // blank array to store data 
    const result = [];
    // i have created a array of ocr text to with foreach iterate on ocr data
    ocrIngredents.forEach((ingredient) => {
      // find will return the first element it found we use foreach it iterate on each element
      const match = harmfulIngredients.find((item) => {
        const allNames = [
          item.name.toLowerCase(),
          ...item.aliases.map((a) => a.toLowerCase()),
        ];
        // if ocr ingredint present in dataset it return true and data added to match match is a obejct 
        return allNames.includes(ingredient.trim().toLowerCase());
      });

      if (match) {
        const userData = USER.healthData;
        // this return true or false like  match.diet["vegetarian"] // → true
        const isDietOk =
          match.diet[
            userData.dietaryPreference.toLowerCase()
          ];
        const riskDiabetes = userData.diabetes ? match.risks.diabetes : "none";
        const riskBP = userData.bloodPressure? match.risks.high_blood_pressure: "none";
         if (!isDietOk || riskDiabetes !== "low" || riskBP !== "low") {
          result.push({
            ingredient: match.name,
            aliases: match.aliases,
            reason: match.warning,
          });
        }
      }
    });

    res.json({ harmful: result });
  } catch (error) {
    console.error("Error analyzing result:", error);
    res.status(500).json({ message: "Server error during analysis" });
  }
};
