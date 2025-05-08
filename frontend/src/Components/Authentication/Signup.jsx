import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./Signup.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//! I have removed JWT token from Signup becouse now we have added otp verification , so when user is signup we will redirect user to email verification page where we enter otp after we send the JWT token and add it too cookies if we send JWT after signup and befire otp user can access all routes , which is a security issue so we add jwt after otp is verifies so that user does need to login again after the user is verified.

const Register = () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
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
        `${apiURL}/auth/smarteats/signup`,
        {
          name,
          email,
          password,
        },
        // ? Include credentials (like cookies) with the request 
        // *Without withCredentials: true:The backend might send a Set-Cookie (e.g. token=abc123)But the browser will not store or send it in the next requests.
        // *With withCredentials: true:Your browser stores the cookie (token) properly.
        { withCredentials: true }
      );
      localStorage.setItem("verificationEmail", email);
      setTimeout(()=>{
        navigate("/verify-email");
      },1000);
      
      setName("");
      setEmail("");
      setPassword("");
      toast.success(response.data.message || "Signup successful!");
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
      <div className={styles.container}>
        <h1 className={styles.heading}>Register for Smart Eats</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              className={styles.input}
              placeholder="Full Name"
              aria-label="Full Name"
            />
          </div>

          <div className={styles.inputGroup}>
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
              placeholder="Email Address"
              aria-label="Email Address"
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

          <button className={styles.registerBtn}>SIGN UP</button>

          <p className={styles.loginText}>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>

          <div className={styles.divider}>OR CONTINUE WITH</div>
        </form>
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
      </div>
    </div>
  );
};

export default Register;
