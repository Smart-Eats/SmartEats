import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import styles from "./BarcodeResult.module.css";

const BarcodeResult = () => {
  const location = useLocation();
  const barcode = location.state?.barcode;
  const foodApi = import.meta.env.VITE_OPEN_FOOD_FACT_API;

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);

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
        toast.error("Error occurred while fetching data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBarcodeData();
  }, [barcode, foodApi]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#695cfe" loading={true} size={60} />
      </div>
    );
  }

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
        {productData.product_name || productData.categories|| "Product Name Unavailable"}
      </h2>

      {/* Product Image */}
      <div className={styles.imageContainer}>
        <img
          src={productData.image_front_url || "https://via.placeholder.com/400"}
          alt={productData.product_name || "Product Image"}
          className={styles.productImage}
          onError={(e) => (e.target.src = "https://via.placeholder.com/400")} // Fallback image
        />
      </div>

      {/* Product Details */}
      <div className={styles.details}>
        <p>
          <strong>Brand:</strong> {productData.brands || "Not available"}
        </p>
        <p>
          <strong>Categories:</strong>{" "}
          {productData.categories || "Not available"}
        </p>
        <p>
          <strong>Ingredients:</strong>{" "}
          {productData.ingredients_text || "Not available"}
        </p>
        <p>
          <strong>Nutri-Score:</strong>{" "}
          {productData.nutrition_grades?.toUpperCase() || "N/A"}
        </p>
        <p>
          <strong>EcoScore:</strong>{" "}
          {productData.ecoscore_grade?.toUpperCase() || "N/A"} (Score:{" "}
          {productData.ecoscore_score || "N/A"})
        </p>
        <p>
          <strong>NOVA Group:</strong>{" "}
          {productData.nova_groups_tags?.[0] || "Not available"}
        </p>
        <p>
          <strong>Country of Origin:</strong>{" "}
          {productData.countries || "Not available"}
        </p>
      </div>

      {/* Nutritional Information (if available) */}
      {productData.nutriments && Object.keys(productData.nutriments).length > 0 ? (
        <div className={styles.nutritionContainer}>
          <h3>Nutritional Information (per 100g)</h3>
          <ul>
            {productData.nutriments.energy_100g && (
              <li>
                <strong>Energy:</strong>{" "}
                {productData.nutriments.energy_100g} kJ
              </li>
            )}
            {productData.nutriments.fat_100g && (
              <li>
                <strong>Fat:</strong> {productData.nutriments.fat_100g} g
              </li>
            )}
            {productData.nutriments["saturated-fat_100g"] && (
              <li>
                <strong>Saturated Fat:</strong>{" "}
                {productData.nutriments["saturated-fat_100g"]} g
              </li>
            )}
            {productData.nutriments.sugars_100g && (
              <li>
                <strong>Sugars:</strong> {productData.nutriments.sugars_100g} g
              </li>
            )}
            {productData.nutriments.sodium_100g && (
              <li>
                <strong>Sodium:</strong> {productData.nutriments.sodium_100g} g
              </li>
            )}
            {productData.nutriments.proteins_100g && (
              <li>
                <strong>Proteins:</strong>{" "}
                {productData.nutriments.proteins_100g} g
              </li>
            )}
          </ul>
        </div>
      ) : (
        <p className={styles.noData}>Nutritional information not available.</p>
      )}
    </div>
  );
};

export default BarcodeResult;