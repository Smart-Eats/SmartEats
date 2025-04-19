import { user } from "../model/user.model.js";

export const OCR_RESULTS = async (req, res) => {
  try {
    const { email } = req.user;
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
  };

  const ocrData = USER.imageData[0].extractedText;
  res.status(200).json({
    success: true,
    text: ocrData,
  });
  } catch (error) {
    console.log(error.message);
  }
};
