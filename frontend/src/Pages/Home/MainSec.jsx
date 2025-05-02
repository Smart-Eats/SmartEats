import React, { useState, useEffect } from "react";
import Card from "./Card";
import CardData from "./CardData";
import { motion } from "framer-motion";
import './Home.css'
const MainSec = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < CardData.length) {
      const interval = setInterval(() => {
        setVisibleCards((prev) => [...prev, CardData[index]]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [index]);

  return (
    <div className="Mainsec-container">
      <div className="Mainsec-part1">
      <video src="/smvideo.mp4" autoPlay loop muted />
        <div>
          <h1>Welcome to Smart Eats</h1>
          <p>Discover a smarter way to manage your meals and nutrition.</p>
          <button>Get Started</button>
          <img src="/Images/tikka.jpeg" alt="" srcSet="" />
        </div>
      </div>

      <div className="Mainsec-part2">
        {visibleCards.map((elem) => (
          <motion.div
            key={elem.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card img={elem.img} title={elem.title} content={elem.content} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MainSec;
