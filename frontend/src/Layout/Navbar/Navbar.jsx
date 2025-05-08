import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { UserStore } from "@/Store/UserInfo.Store";

const Navbar = () => {
  const{handleGetUserData} = useContext(UserStore);
  const[data,setData] = useState({});
  const[loading,setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async() => {
      try {
        const response = await handleGetUserData();
        setData(response);
      } catch (error) {
        console.log(error.message);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  },[]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container}>
        
        <ul className={styles.navbar_links}>
          <li>
            <div className={styles.user_info}>
            {loading ? "Loading..." : data.name || "Guest"}
              <div className={styles.img_div}>
                <img
                  src="/Images/cat.jpg"
                  className={styles.nav_img}
                  alt="Profile"
                  onClick={() => navigate("/layout/user-profile")}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
