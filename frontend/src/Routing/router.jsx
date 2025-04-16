import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts and Pages
import AppLayout from "../Layout/AppLayout";
import ErrorPage from "../Components/Error/ErrorPage";
import Homepage from "../Pages/Homepage";

// Auth Pages
import MainLoginPage from "../Components/Authentication/MainAuthentication";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Signup"; // if this is same as Signup, pick one

// User Features
import UserProfile from "../Components/UserProfile/UserProfile";
import Upload from "../Components/Features/Upload Image/Upload";
import { Calories } from "../Components/Features/CaloriesCounter/Calories";
import BMI from "../Components/Features/BMI/BMI1/BMI";
import BMI2 from "../Components/Features/BMI/BMI2/BMI2";
import BMI3 from "../Components/Features/BMI/BMI3/BMI3";
import EmailVerification from "@/Components/Authentication/EmailVerification";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLoginPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Login /> },  // default is login
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "verify-email", element: <EmailVerification /> },
    ],
  },
  // Protected Routes inside layout
  {
    path: "/layout",
    element: <AppLayout showSidebar={true} />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <Homepage /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "upload", element: <Upload /> },
      { path: "calorie-counter", element: <Calories /> },
      { path: "bmi-calculator", element: <BMI /> },
      { path: "bmi-calculator/select", element: <BMI2 /> },
      { path: "bmi-calculator/select/result", element: <BMI3 /> },
    ],
  },
]);

export default router;
