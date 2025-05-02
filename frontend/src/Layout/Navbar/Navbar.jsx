import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container}>
        <ul className={styles.navbar_links}>
          <li>
            <div className={styles.img_div}> 
              <img src="/Images/cat.jpg" className={styles.nav_img} alt="" onClick={()=>{navigate('/userProfile')}}/>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
