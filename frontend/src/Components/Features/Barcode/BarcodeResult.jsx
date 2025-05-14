import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import styles from "./BarcodeResult.module.css";

const BarcodeResult = () => {
  const foodApi = import.meta.env.VITE_OPEN_FOOD_FACT_API;
  const apiURL = import.meta.env.VITE_BACKEND_URL;

  const location = useLocation();
  const barcode = location.state?.barcode;

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [result, setResult] = useState([]);

useEffect(() => {
  const fetchBarcodeData = async () => {
    if (!barcode) {
      toast.error("No barcode provided.");
      setLoading(false); 
      return;
    }

    try {
      const response = await axios.get(`${foodApi}/${barcode}.json`);
      if (response.data.status === 0) {
        toast.error("Product not found for this barcode.");
        setProductData(null);
      } else {
        setProductData(response.data.product);
      }
    } catch (error) {
      toast.error("Error fetching product data.");
      console.error(error);
      setProductData(null);
    } finally {
      setLoading(false); 
    }
  };

  fetchBarcodeData();
}, [barcode, foodApi]);

useEffect(() => {
  const analyzeIngredients = async () => {
    if (!productData) return; 

    if (!productData.ingredients_text) {
      toast.error("No ingredients available for this product.");
      setLoading(false); 
      return;
    }

    try {
      const ocrArray = productData.ingredients_text
        .split(",")
        .map((item) => item.trim().toLowerCase());

      const analyzeData = await axios.post(
        `${apiURL}/healthData/smarteats/analyze-result`,
        { ocrIngredents: ocrArray },
        { withCredentials: true }
      );

      console.log("Harmful ingredients:", analyzeData.data.harmful);
      setResult(analyzeData.data.harmful);
    } catch (error) {
      toast.error("Error analyzing ingredients.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  analyzeIngredients();
}, [productData]);

// Show loader while loading state is true
if (loading) {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color="#695cfe" loading={true} size={60} />
    </div>
  );
}

// Show message if no product data is found
if (!productData) {
  return (
    <div className={styles.errorContainer}>
      <h2>No product data found for this barcode.</h2>
    </div>
  );
}

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.title}>
        {productData.product_name ||
          productData.categories ||
          "Product Name Unavailable"}
      </h2>

      {/* Product Image */}
      <div className={styles.imageContainer}>
        <img
          src={productData.image_front_url || "https://via.placeholder.com/400"}
          alt={productData.product_name || "Product Image"}
          className={styles.productImage}
          onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
        />
      </div>

      {/* Product Details */}
      <div className={styles.details}>
        <div className={`${styles.detailCard} ${styles.brandCard}`}>
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z" />
              <path
                fillRule="evenodd"
                d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0.75.75 0 011.5 0z"
                clipRule="evenodd"
              />
            </svg>
            Brand
          </h3>
          <div className={styles.detailContent}>
            {productData.brands || "Not available"}
          </div>
        </div>

        <div className={`${styles.detailCard} ${styles.countryCard}`}>
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            Country of Origin
          </h3>
          <div className={styles.detailContent}>
            {productData.countries || "Not available"}
          </div>
        </div>

        <div className={`${styles.detailCard} ${styles.categoriesCard}`}>
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
            </svg>
            Categories
          </h3>
          <div className={styles.detailContent}>
            {productData.categories || "Not available"}
          </div>
        </div>

        <div className={`${styles.detailCard} ${styles.ingredientsCard}`}>
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Ingredients
          </h3>
          <div className={styles.detailContent}>
            {productData.ingredients_text || "Not available"}
          </div>
        </div>
        {result.length > 0 && (
          <div className={`${styles.detailCard} ${styles.harmfulCard}`}>
            <h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 15h-1.5v-1.5h1.5V17zm0-3h-1.5V7h1.5v7z" />
              </svg>
              ⚠️ Harmful Ingredients for You
            </h3>
            <div className={styles.detailContent}>
              <ul>
                {result.map((item) => (
                  <div key={item.ingredient} className={styles.harmfulItem}>
                    <div className={styles.ingredientHeader}>
                      <strong className={styles.ingredientName}>
                        {item.ingredient}
                      </strong>
                      {item.aliases && item.aliases.length > 0 && (
                        <span className={styles.aliases}>
                          {" "}
                          (also known as: {item.aliases.join(", ")})
                        </span>
                      )}
                    </div>
                    <div className={styles.reason}>{item.reason}</div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeResult;
