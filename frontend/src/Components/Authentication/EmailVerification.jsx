import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  const apiURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);
  const handleSubmit = async (e) => {
    // Handle OTP submission
    e.preventDefault();

    try {
      const response = await axios.post(`${apiURL}/auth/smarteats/verify-otp`, {
        otp,
      });
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/login");
      },2000);
      
      // Clear stored Email  from localStorage after verification
      localStorage.removeItem("verificationEmail");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <Toaster />
      <h1 className="text-3xl font-bold text-white mb-6">Verify Your Email</h1>
      <p className="text-gray-300 mb-8 text-center max-w-xs">
        Enter the 6-digit code we sent to <span className="text-red-600 text-center flex justify-center">{email}</span> to continue.
      </p>

      <InputOTP maxLength={6} value={otp} onChange={setOtp} className="gap-3">
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            className="border border-gray-600 text-white bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl text-2xl w-14 h-16"
          />
          <InputOTPSlot
            index={1}
            className="border border-gray-600 text-white bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl text-2xl w-14 h-16"
          />
          <InputOTPSlot
            index={2}
            className="border border-gray-600 text-white bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl text-2xl w-14 h-16"
          />
        </InputOTPGroup>

        <InputOTPSeparator className="text-gray-400 text-3xl">
          -
        </InputOTPSeparator>

        <InputOTPGroup>
          <InputOTPSlot
            index={3}
            className="border border-gray-600 text-white bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl text-2xl w-14 h-16"
          />
          <InputOTPSlot
            index={4}
            className="border border-gray-600 text-white bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl text-2xl w-14 h-16"
          />
          <InputOTPSlot
            index={5}
            className="border border-gray-600 text-white bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl text-2xl w-14 h-16"
          />
        </InputOTPGroup>
      </InputOTP>

      <button
        onClick={handleSubmit}
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
      >
        Verify
      </button>
    </div>
  );
};

export default EmailVerification;
