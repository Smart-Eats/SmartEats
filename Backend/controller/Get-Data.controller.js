import { user } from "../model/user.model.js";

export const OCR_RESULTS = async (req, res) => {
  try {
    const { email,id } = req.user;
    const USER = await user.findOne({ email }).populate({
      path: "imageData",
      options: {
        sort: {
          uploadedAt: -1,
        },
      },
    });
    if (!USER || USER.imageData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No image data found for the user",
      });
    }

    const ocrData = USER.imageData[0].extractedText;
    res.status(200).json({
      success: true,
      text: ocrData,
      user_ID:id
    });
  } catch (error) {
    console.log(error.message);
  }
};

// export const HEALTH_RESULTS = async (req, res) => {
//   try {
//     const { email } = req.user;
//     const Valid_Health_User = await user.findOne({ email });
//     if (!Valid_Health_User) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User Not Found" });
//     }
//     res.status(200).json({
//       success: true,
//       healthData: Valid_Health_User.healthData,
//     });
//   } catch (error) {
//     console.error("Error fetching health data:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
