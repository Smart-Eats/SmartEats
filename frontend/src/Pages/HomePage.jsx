import React from "react";
import MainSec from "../Components/MainSec";
import UserSec from "../Components/UserSec";

import "./Home/Home.css";

const HomePage = () => {
  return (
    <>
      <div className="home-container">
        <MainSec />
        <UserSec />
      </div>
    </>
  );
};

export default HomePage;
