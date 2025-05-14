import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts and Pages
import AppLayout from "../Layout/AppLayout";
import ErrorPage from "../Components/Error/ErrorPage";
import HomePage from "@/Components/Home/HomePage";

// Auth Pages
import MainLoginPage from "../Components/Authentication/MainAuthentication";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Signup"; // if this is same as Signup, pick one

// User Features
import UserProfile from "../Components/UserProfile/UserProfile";
import Upload from "../Components/Features/Upload Image/Upload";
import BMI2 from "../Components/Features/BMI/BMI2/BMI2";
import BMI3 from "../Components/Features/BMI/BMI3/BMI3";
import EmailVerification from "@/Components/Authentication/EmailVerification";
import Result from "@/Components/Features/Results/Result";
import HealthProfileForm from "@/Components/HealthForm/HealthProfileModal";
import FoodDetail from "@/Components/Features/FoodDetail/FoodDetail";
import ProtectedRoute from "@/ProtectedRoutes/ProtectedRoute";
import Barcode from "@/Components/Features/Barcode/Barcode";
import BarcodeResult from "@/Components/Features/Barcode/BarcodeResult";



const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLoginPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Login /> }, // default is login
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "verify-email", element: <EmailVerification /> },
    ],
  },
  // Protected Routes inside layout
  {
    path: "/layout",
    element: (
      //  setting up token in localstorage to set up protected route in frontend if token is there only then user will able to access the react routes
      <ProtectedRoute>
        <AppLayout showSidebar={true} />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "upload", element: <Upload /> },
      { path: "barcode", element: <Barcode /> },
      { path: "barcode-result", element: <BarcodeResult /> },
      { path: "result", element: <Result /> },
      { path: "health-form", element: <HealthProfileForm /> },
      { path: "bmi-calculator/select", element: <BMI2 /> },
      { path: "bmi-calculator/select/result", element: <BMI3 /> },
      { path: "nutrition-finder", element: <FoodDetail /> },
    ],
  },
]);

export default router;
