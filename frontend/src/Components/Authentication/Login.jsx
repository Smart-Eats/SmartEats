import React, { useState } from "react";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiURL}/auth/smarteats/login`,
        {
          email,
          password,
        },
        // ? Include credentials (like cookies) with the request 
        // *Without withCredentials: true:The backend might send a Set-Cookie (e.g. token=abc123)But the browser will not store or send it in the next requests.
        // *With withCredentials: true:Your browser stores the cookie (token) properly.
        { withCredentials: true }
      );
      //? setting up token in localstorage to set up protected route in frontend if token is there only then user will able to access the react routes
      localStorage.setItem("token",response.data.token);
      
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/layout/home");
      },1000);
      
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error.join("\n"));
      } else {
        toast.error(err.response?.data?.message || "Signup failed");
      }
    }
  };
  return (
    <div className={styles.main}>
      <Toaster
        position="top-right"
        gutter={16}
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            maxWidth: "500px",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          success: {
            style: {
              background: "#10B981",
              color: "#FFFFFF",
              borderLeft: "4px solid #059669",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "#FFFFFF",
            },
          },
        }}
      />
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Login To Smart Eats</h1>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <i className="fas fa-user"></i>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
              placeholder="Email "
              aria-label="Email"
            />
          </div>

          <div className={styles.inputGroup}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <button className={styles.loginBtn}>LOG IN</button>

          <p className={styles.registerText}>
            Don't have an account? <NavLink to="/signup">Sign up</NavLink>
          </p>

          <div className={styles.divider}>OR CONTINUE WITH</div>
        </div>
        <div className={styles.socialButtons}>
          <button
            className={styles.googleBtn}
            onClick={() => {
              window.location.href = `${apiURL}/auth/smarteats/google`;
            }}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
