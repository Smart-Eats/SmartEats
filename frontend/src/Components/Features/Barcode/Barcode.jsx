import React, { useContext, useState } from "react";
import styles from "./Barcode.module.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Quagga from "quagga";
import { UserStore } from "@/Store/UserInfo.Store";

const Barcode = () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const [barcodeImg, setBarcodeImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const {triggerRefresh} = useContext(UserStore)
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setBarcodeImg(e.target.files[0]);
  };

  const handleBarcodeDecodeAndUpload = async () => {
    if (!barcodeImg) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const imageData = reader.result;

        Quagga.decodeSingle(
          {
            src: imageData,
            numOfWorkers: 0,
            decoder: {
              readers: [
                "upc_reader",
                "ean_reader",
                "code_128_reader",
                "ean_8_reader",
                "upc_e_reader",
              ],
            },
            locate: true,
          },
          async (result) => {
            if (result && result.codeResult) {
              const barcodeValue = result.codeResult.code;
              console.log("Decoded barcode:", barcodeValue);

              //  Send barcode to backend
              const response = await axios.post(
                `${apiURL}/barcode/smarteats/barcode-scanning`,
                { barcode_Number: barcodeValue },
                { withCredentials: true }
              );

              toast.success(response.data.message);
              // passing the data to barcode result page without using props and context api we are using useNaviagte state to pass data
              setTimeout(() => {
                navigate("/layout/barcode-result", {
                  state: { barcode: barcodeValue },
                });
              }, 1000);
              //! this trigger refresh will update the count valaue of the uplaod image count in the navabar 
              triggerRefresh();
            } else {
              toast.error("Failed to decode barcode.");
            }
          }
        );
      } catch (err) {
        toast.error("An error occurred while decoding.");
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(barcodeImg); // This ensures browser compatibility
    setBarcodeImg(null);
  };

  return (
    <>
      <div className={styles.main_conatiner}>
        <Toaster />
        <div className={styles.main_box}>
          <div className={styles.upload_box}>
            <div className={styles.img_box}>
              <img src="/Images/barcode/scanner.png" alt="not-found" />
            </div>
            <div className={styles.main_box_text}>
              <h2>Drop or Upload Barcode Image</h2>
            </div>
            <div className={styles.main_button_box}>
              <label htmlFor="file-upload" className={styles.upload_button}>
                <FontAwesomeIcon
                  icon={faUpload}
                  className={styles.upload_icon}
                />
                {/* if image is there then show image name otherwise show show choose file */}
                {barcodeImg ? (
                  <span className={styles.file_name}>{barcodeImg.name}</span>
                ) : (
                  <span>Choose File</span>
                )}
              </label>

              <input
                type="file"
                id="file-upload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />

              {/* Redesigned Upload Button */}
              <button
                onClick={handleBarcodeDecodeAndUpload}
                disabled={!barcodeImg || isUploading}
                className={`${styles.submit_button} ${
                  isUploading ? styles.uploading : ""
                }`}
              >
                {isUploading ? (
                  <>
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      className={styles.upload_icon}
                      spin
                    />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      className={styles.upload_icon}
                    />
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

export default Barcode;
