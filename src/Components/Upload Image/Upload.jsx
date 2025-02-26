import React from "react";
import styles from "./Upload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const Upload = () => {
  return (
    <>
      <div className={styles.main_conatiner}>
        <div className={styles.main_box}>
          <div className={styles.upload_box}>
            <div className={styles.img_box}>
              <img
                src="https://img.freepik.com/premium-psd/3d-image-photo-picture-gallery-folder-icon-illustration_148391-1077.jpg"
                alt="not-found"
              />
            </div>
            <div className={styles.main_box_text}>
              <h2>Drop,Upload or Paste image</h2>
              <p>Supported formats:JPG,PNG,GIF,JFIF(JPEG),HEIC,PDF</p>
            </div>
            <div className={styles.main_button_box}>
              <button>
                <FontAwesomeIcon icon={faUpload} />
                Browse
              </button>
              <button>
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>
          <div className={styles.footer_cont}>
            <p>*Your privacy is protected!No data is transmitted or stored.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
