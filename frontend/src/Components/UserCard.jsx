import React from "react";

const UserCard = ({ img, content, author }) => {
  return (
    <>
      <div className="Usercard-cont">
        <img src={img} alt="not-found" />
        <p>{content}</p>
        <p>
          <b>{author}</b>
        </p>
      </div>
    </>
  );
};

export default UserCard;
