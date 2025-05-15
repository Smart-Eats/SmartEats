import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
const FoodDetail = () => {
  const [foodItem, setFoodItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const handleSearch = async () => {
    setLoading(true);
    setNutritionData(null);
    try {
      const response = await axios.post(
        `${apiURL}/healthData/smarteats/search-food-item`,
        {
          foodItem,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Successfully Fetched the Nutrients Details");
      setNutritionData(response.data);
    } catch (error) {
      console.error("API error:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFoodChange = (e) => {
    setFoodItem(e.target.value);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#695cfe" loading={true} size={60} />
      </div>
    );
  }
  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Nutrition Finder
          </h1>
          <p className="text-lg text-gray-600">
            Discover the nutritional value of your favorite foods
          </p>
        </header>

        <div className="mb-12">
          <div className="relative flex items-center max-w-xl mx-auto shadow-lg rounded-full bg-white">
            <input
              type="text"
              value={foodItem}
              onChange={handleFoodChange}
              placeholder="Search for a food (e.g., banana, paneer, dosa...)"
              className="w-full py-4 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        {nutritionData && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start">
              <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 bg-yellow-100 p-4 rounded-full"></div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
                  {nutritionData.name}
                </h2>
                <p className="text-gray-600 max-w-md">
                  {nutritionData.description}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-100 mx-6"></div>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Nutrition Facts{" "}
                <span className="text-sm font-normal text-gray-500">
                  (per {nutritionData.servingSize})
                </span>
              </h3>
              {/* All dats is comming from backend is the same way as the pompt given to AI */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: "Calories",
                    value: nutritionData.calories,
                    color: "green",
                  },
                  { label: "Fat", value: nutritionData.fat, color: "blue" },
                  {
                    label: "Carbs",
                    value: nutritionData.carbs,
                    color: "yellow",
                  },
                  {
                    label: "Protein",
                    value: nutritionData.protein,
                    color: "red",
                  },
                  {
                    label: "Fiber",
                    value: nutritionData.fiber,
                    color: "purple",
                  },
                  { label: "Sugar", value: nutritionData.sugar, color: "pink" },
                  {
                    label: "Potassium",
                    value: nutritionData.potassium,
                    color: "indigo",
                  },
                  {
                    label: "Vitamin C",
                    value: nutritionData.vitaminC,
                    color: "orange",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`bg-${item.color}-50 p-4 rounded-xl text-center`}
                  >
                    <div
                      className={`text-2xl font-bold text-${item.color}-700`}
                    >
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8">
              <h4 className="font-medium text-gray-800 mb-3">
                Health Benefits
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {nutritionData.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-8">
          Nutritional values may vary depending on size and ripeness.
        </p>
        <br></br>
      </div>
    </div>
  );
};

export default FoodDetail;
