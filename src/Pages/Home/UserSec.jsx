import React from "react";
import UserCard from "./UserCard";
import UserCarddata from "./UserCarddata";
import './Home.css'
const UserSec = () => {
  return (
    <>
      <div className="UserSec-container">
        <div className="user-head">
          <h1>What Our Users Say</h1>
        </div>
        <div className="user-cards">
          {UserCarddata.map((elem) => (
            <UserCard
              key={elem.id}
              img={elem.img}
              content={elem.content}
              author={elem.author}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSec;
