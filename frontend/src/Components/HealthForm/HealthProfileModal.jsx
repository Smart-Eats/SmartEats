import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const HealthProfileForm = () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    diabetes: false,
    bloodPressure: false,
    dietaryPreference: "Vegetarian", // default to veg
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiURL}/healthData/smarteats/user-data`, formData, {
        withCredentials: true,
      });
      toast.success("Health profile saved successfully!");
    } catch (error) {
      console.error("Error submitting health data:", error);
      toast.error("Failed to save health profile. Please try again.");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <Toaster />
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Health Profile</h1>
          <p className="mt-1 text-sm text-gray-600">Help us personalize your experience</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  min="30"
                  max="300"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Health Conditions
              </h3>
              <div className="space-y-1.5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="diabetes"
                    checked={formData.diabetes}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Diabetes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="bloodPressure"
                    checked={formData.bloodPressure}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    High Blood Pressure
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Dietary Preference
              </h3>
              <div className="space-y-1.5">
                {["Vegetarian", "Vegan", "Non-Veg"].map((option) => {
                  return (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="dietaryPreference"
                        value={option}
                        checked={formData.dietaryPreference === option}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthProfileForm;