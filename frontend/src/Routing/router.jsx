import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLoginPage from "../Components/Login_Signup/MainLoginPage";
import AppLayout from "../Layout/AppLayout"
import ErrorPage from "../Components/Error/ErrorPage"
import UserProfile from "../Components/UserProfile/UserProfile";
import Upload from "../Components/Features/Upload Image/Upload";
import BMI from "../Components/Features/BMI/BMI1/BMI";
import Homepage from "../Pages/Homepage";
import BMI2 from "../Components/Features/BMI/BMI2/BMI2";
import BMI3 from "../Components/Features/BMI/BMI3/BMI3";
import { Calories } from "../Components/Features/CaloriesCounter/Calories";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout showSidebar={true} />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/userProfile", element: <UserProfile /> },
      { path: "/upload", element: <Upload /> },
      { path: "/calorieCounter", element: <Calories /> },
      { path: "/bmiCalculator", element: <BMI /> },
      { path: "/bmiCalculator/select", element: <BMI2 /> },
      { path: "/bmiCalculator/select/result", element: <BMI3 /> },
    ],
  },
  { path: "/login", element: <MainLoginPage /> },
]);
export default router;
