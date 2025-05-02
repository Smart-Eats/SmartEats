import React, { useState } from "react";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
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
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster/>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Health Profile</h1>
          <p className="mt-2 text-gray-600">
            Help us personalize your experience
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg overflow-hidden p-6"
        >
          <div className="space-y-6">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  min="30"
                  max="300"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Health Conditions
              </h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="diabetes"
                    checked={formData.diabetes}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Diabetes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="bloodPressure"
                    checked={formData.bloodPressure}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    High Blood Pressure
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Dietary Preference
              </h3>
              <div className="space-y-2">
                {["Vegetarian", "Vegan", "Non-Veg"].map((option) => {
                  return (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="dietaryPreference"
                        value={option}
                        checked={formData.dietaryPreference === option}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
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
