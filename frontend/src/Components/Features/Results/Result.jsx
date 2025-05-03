import React, { useEffect, useState } from "react";
import axios from "axios";

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
        const userId = response.data.user_ID;
        setData(ocrText);
        // converting the string of ocr in array of lowercase characters
        const textArray = () => {
          return ocrText.split(",").map((item) => item.trim().toLowerCase());
        };
        // passing the data to backend for anaysis of result
        const analyzeData = await axios.post(
          `${apiURL}/healthData/smarteats/analyze-result`,
          { ocrIngredents: textArray(), userId: userId },
          {
            withCredentials: true,
          }
        );
        console.log("Harmful ingredients:", analyzeData.data.harmful);
        setResult(analyzeData.data.harmful);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAndAnalyze_Data();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>{data}</div>
      {result.length === 0 ? (
        <div>No harmful ingredients found.</div>
      ) : (
        result.map((item) => (
          <div key={item.ingredient}>
            <strong>{item.ingredient}</strong>
            {item.aliases && item.aliases.length > 0 && (
              <span> ({item.aliases.join(", ")})</span>
            )}{" "}
            — {item.reason}
          </div>
        ))
      )}
    </>
  );
};

export default Result;
