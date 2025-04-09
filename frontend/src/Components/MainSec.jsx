import React from "react";
import Card from "./Card";
import CardData from "../Data/CardData";

const MainSec = () => {
  return (
    <>
      <div className="Mainsec-container">
        <div className="Mainsec-part1">
          <h1>Welcome to Smart Eats</h1>
          <p>Discover a smarter way to manage your meals and nutrition.</p>
          <button>Get Started</button>
        </div>
        <div className="Mainsec-part2">
          {CardData.map((elem) => (
            <Card
              key={elem.id}
              img={elem.img}
              title={elem.title}
              content={elem.content}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainSec;
