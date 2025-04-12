import React from "react";
import {RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routing/router";
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
