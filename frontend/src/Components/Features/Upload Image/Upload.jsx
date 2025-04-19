import React, { useState } from "react";
import styles from "./Upload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { DarkMode } from "../../../Store/DarkModeStore";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
const Upload = () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    
    if (!image) {
      toast.error(error.response?.data?.message || "Uplaod Failed");
      return;
    }
    // ! when we enter in startuplaoding form and after the check that image is present , we start spinning the upload value and after the catch block when the uplaoding is finised we we stop spinnig by making uplaodstate false
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    
    try {
      const response = await axios.post(`${apiURL}/upload/smarteats/food-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Uplaod Failed");
    } finally {
      setIsUploading(false);
    }
  };

  const { isDarkMode } = useContext(DarkMode);

  return (
    <>
      <div className={`${styles.main_conatiner} ${isDarkMode ? `${styles.dark}` : ""}`}>
        <Toaster />
        <div className={styles.main_box}>
          <div className={styles.upload_box}>
            <div className={styles.img_box}>
              <img src="/Images/upload.png" alt="not-found" />
            </div>
            <div className={styles.main_box_text}>
              <h2>Drop, Upload or Paste image</h2>
              <p>Supported formats: JPG, PNG, GIF, JFIF(JPEG), HEIC, PDF</p>
            </div>
            <div className={styles.main_button_box}>
              <label htmlFor="file-upload" className={styles.upload_button}>
                <FontAwesomeIcon icon={faUpload} className={styles.upload_icon} />
                {/* if image is there then show image name otherwise show show choose file */}
                {image ? <span className={styles.file_name}>{image.name}</span>:<span>Choose File</span>}
              </label>
              
              <input
                type="file"
                id="file-upload"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              
              {/* Redesigned Upload Button */}
              <button 
                onClick={handleUpload}
                disabled={!image || isUploading}
                className={`${styles.submit_button} ${isUploading ? styles.uploading : ''}`}
              >
                {isUploading ? (
                  <>
                    <FontAwesomeIcon icon={faCloudArrowUp} className={styles.upload_icon} spin />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCloudArrowUp} className={styles.upload_icon} />
                    <span>Upload Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className={styles.footer_cont}>
            <p>*Your privacy is protected! No data is transmitted or stored.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;