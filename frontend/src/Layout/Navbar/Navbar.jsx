import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { UserStore } from "@/Store/UserInfo.Store";
const Navbar = () => {
  const { handleGetUserData, refreshUser } = useContext(UserStore);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetUserData();
        console.log("User response:", response);

        setData(response);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // This effect now runs every time refreshUser changes. So if any other component calls triggerRefresh(), jaise hi image uplaod hogi true ka false hoga ya false ka true jaise hi value chenge hogi useeffect run ho jaega or count update ho haega , ye bs true ka flase , false ka true kr rha h chaye kuch bhi ho true ya flase jaise hi state change hogi page refresh ho jaega
  }, [refreshUser]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container}>
        <ul className={styles.navbar_links}>
          <li>
            <div className={styles.user_info}>
              {loading ? (
                <span className={styles.username}>Loading...</span>
              ) : data.name ? (
                <>
                  <span className={styles.username}>{data.name}</span>
                  <div className={styles.uploads}>
                    <img
                      src="/Images/navbvar/image_uplaod_count.png"
                      alt="Uploads"
                      className={styles.upload_icon}
                    />
                    <span className={styles.upload_count}>
                      <span className={styles.upload_number}>
                        {(data.imageData?.length ?? 0) +
                          (data.barcodes?.length ?? 0)}
                      </span>{" "}
                      <span className={styles.uplaod_text}>U</span>ploads
                    </span>
                  </div>
                </>
              ) : (
                <button
                  className={styles.login_button}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login
                </button>
              )}

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
