import React, { useEffect, useState } from "react";
import axios from "axios";
import {ClipLoader} from 'react-spinners';
import styles from './Result.module.css';

const Result = () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAndAnalyze_Data = async () => {
      try {
        const response = await axios.get(`${apiURL}/data/ocr-result`, {
          withCredentials: true,
        });
        const ocrText = response.data.text;
        setData(ocrText);
        //! converting the string of ocr in array of lowercase characters
        const textArray = () => {
          return ocrText.split(",").map((item) => item.trim().toLowerCase());
        };
        // !passing the data to backend for anaysis of result
        const analyzeData = await axios.post(
          `${apiURL}/healthData/smarteats/analyze-result`,
          { ocrIngredents: textArray()},
          {
            withCredentials: true,
          }
        );
        // !this harmful name is comming from backed like i have passed data to frontend with the harmful name
        console.log("Harmful ingredients:", analyzeData.data.harmful);
        setResult(analyzeData.data.harmful);
      } catch (error) {
        console.log(error.message);
      } finally {
       setTimeout(()=>{
        setLoading(false);
       },1000)
      }
    };
    fetchAndAnalyze_Data();
  }, []);

   if (loading) {
     return (
       <div className={styles.loaderContainer}>
         <ClipLoader color="#695cfe" loading={true} size={60} />
         <p className={styles.loadingText}>Analyzing your ingredients...</p>
       </div>
     );
   }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ingredient Analysis</h1>
        <p className={styles.subtitle}>Here's what we found in your product</p>
      </div>
      
      <div className={styles.scannedTextContainer}>
        <h2 className={styles.sectionTitle}>Scanned Ingredients</h2>
        <div className={styles.scannedText}>{data}</div>
      </div>
      
      <div className={styles.resultsContainer}>
        <h2 className={styles.sectionTitle}>Analysis Results</h2>
        
        {result.length === 0 ? (
          <div className={styles.noHarmful}>
            <div className={styles.successIcon}>✓</div>
            <h3>No harmful ingredients detected!</h3>
            <p>This product appears to be safe based on your dietary profile.</p>
          </div>
        ) : (
          <>
            <div className={styles.warningBox}>
              <span className={styles.warningIcon}>⚠</span>
              <p>We found {result.length} potentially harmful ingredient{result.length > 1 ? 's' : ''} for you</p>
            </div>
            
            <div className={styles.harmfulList}>
              {result.map((item) => (
                <div key={item.ingredient} className={styles.harmfulItem}>
                  <div className={styles.ingredientHeader}>
                    <strong className={styles.ingredientName}>{item.ingredient}</strong>
                    {item.aliases && item.aliases.length > 0 && (
                      <span className={styles.aliases}> (also known as: {item.aliases.join(", ")})</span>
                    )}
                  </div>
                  <div className={styles.reason}>{item.reason}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Result;