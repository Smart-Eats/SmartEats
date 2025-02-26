import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import MainLoginPage from "./Components/Login_Signup/MainLoginPage";
import AppLayout from "./Layout/AppLayout";
import ErrorPage from "./Components/Error/ErrorPage";
import "./index.css";
import Sidebar from "./Layout/SideBar/Sidebar";
import UserProfile from "./Components/UserProfile/UserProfile";
import Upload from "./Components/Features/Upload Image/Upload";
import BMI from "./Components/Features/BMI/BMI1/BMI";
import Homepage from "./Pages/Homepage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout showSidebar={true} />,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/user",
          element:<UserProfile/>
        },
        {
          path: "/upload",
          element:<Upload/>
        },
        {
          path: "/bmi",
          element:<BMI/>
        }

      ],
    },
    {
      path: "/login",
      element: <MainLoginPage />,
    },
    {
      path: "/sidebar",
      element: <Sidebar />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
