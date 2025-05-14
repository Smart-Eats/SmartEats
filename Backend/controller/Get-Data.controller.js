import { user } from "../model/user.model.js";

export const OCR_RESULTS = async (req, res) => {
  try {
    const { email, id } = req.user;
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
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const BMI_USER_DATA = async (req, res) => {
  try {
    const { email } = req.user;
    const USER = await user.findOne({ email });
    if (!USER) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const name = USER.name;
    // const gender = USER.healthData?.gender;
    const { gender, age, height, weight } = USER.healthData;
    return res.status(200).json({
      success: true,
      name: name,
      gender,
      age,
      height,
      weight,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const USER_PROFILE_DETAIL = async (req, res) => {
  try {
    // ? i have done this becose there is nameing conflict betweeen both the email name so i chnage first email name to userMail
    const { email : userMail } = req.user;
    const USER = await user.findOne({ email: userMail });
    if(!USER){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }
    const { name, email,imageData,barcodes } = USER;
    const {age,height,weight,dietaryPreference,diabetes,gender,bloodPressure} = USER.healthData;
    return res.status(200).json({
      success:true,
      name,
      email,
      age,
      height,weight,
      dietaryPreference,
      diabetes,
      gender,
      bloodPressure,
      imageData,
      barcodes
    });
  } catch (error) {
    res.status(404).json({
      success:false,
      message:"Error In Fetching UserData"
    });
    console.log(error.message);
  }
};
