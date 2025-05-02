import { user } from "../model/user.model.js";
export const HealthDataForm = async (req, res) => {
  try {
    const { email } = req.user;
    const { age, height, weight, gender, diabetes, bloodPressure,dietaryPreference } = req.body;
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
      {new:true}
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    res.status(200).json({
        success:true,
        message: "Health profile saved successfully",
        healthProfile: updatedUser.healthData,
      });
  } catch (error) {
    console.error("Error updating health profile:", error);
    res.status(500).json({ message: "Server error while updating health data" });
  }
};
