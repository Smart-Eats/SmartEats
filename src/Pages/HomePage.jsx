import React from "react";
import MainSec from "../Components/MainSec";
import UserSec from "../Components/UserSec";

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
