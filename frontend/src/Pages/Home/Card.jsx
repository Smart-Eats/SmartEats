import React from "react";
import './Home.css'
const Card = ({ img, title, content }) => {
  return (
    <>
      <div className="card-cont">
        <img src={img} alt="not-fou`nd" />
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </>
  );
};

export default Card;
