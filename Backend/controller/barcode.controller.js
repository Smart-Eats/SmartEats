import { barcode } from "../model/barcode.model.js";
import {user} from '../model/user.model.js';
export const BARCODE_SCANNING = async (req, res) => {
    const{barcode_Number} = req.body;
    const{email} = req.user;
  try {
    if (!barcode_Number) {
      res.status(400).json({ status: false, message: "No file uploaded" });
    }
     const BARCODE = await barcode.create({
        extractedBarcode:barcode_Number,
        uploadedBy:req.user?.id
    })
    const USER = await user.findOne({email});
    // pushing the barcode reference to user model
    USER.barcodes.push(BARCODE._id);
     await USER.save();
    res.status(200).json({
      success: true,
      message: "Barcode uploaded and stored in database",
    });

  } catch (error) {
    console.error("Error saving barcode:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to store barcode",
    });
  }
};
