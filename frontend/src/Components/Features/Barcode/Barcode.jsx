import React, { useState } from "react";
import styles from "./Barcode.module.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
const Barcode = () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const [barcodeImg, setbarcodeImg] = useState(null);

  const handleImageChange = (e) => {
    setbarcodeImg(e.target.files[0]);
  };
  const handleBarcodeUpload = async () => {
    try {
      if (!barcodeImg) {
        toast.error("Please select an image first");
        return;
      }
      const formData = new FormData();
      formData.append("barcode", barcodeImg);
      const response = await axios.post(
        `${apiURL}/barcode/smarteats/barcode-scanning`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <h2>Upload Barcode Image</h2>
      <div className={styles.actions}>
        <label className={styles.uploadLabel}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button className={styles.uploadBtn} onClick={handleBarcodeUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Barcode;
