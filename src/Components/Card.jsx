import React from "react";

const Card = ({ img, title, content }) => {
  return (
    <>
      <div className="card-cont">
        <img src={img} alt="not-found" />
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </>
  );
};

export default Card;
