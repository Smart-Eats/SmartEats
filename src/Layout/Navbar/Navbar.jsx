import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { DarkMode } from "../../Store/DarkModeStore";
const Navbar = () => {
  const{isDarkMode} =useContext(DarkMode);
  return (
    <nav className={`${styles.navbar} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.nav_container}>
        <ul className={styles.navbar_links}>
          <li>
            <img
              src="./Images/cat.jpg"
              className={styles.nav_img}
              alt=""
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
