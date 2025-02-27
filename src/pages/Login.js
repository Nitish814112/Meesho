import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Nav from "../component/Navbar/Nav";

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRXAnZxoD-kl3M1nmRWgTiJbZvjulnfuk",
  authDomain: "meeshologinsystem.firebaseapp.com",
  projectId: "meeshologinsystem",
  storageBucket: "meeshologinsystem.firebasestorage.app",
  messagingSenderId: "837485523416",
  appId: "1:837485523416:web:be571c049641553ac2c2ad",
  measurementId: "G-28ZX82JHBR",
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP

  // 🔹 Function to Send OTP
  const sendOTP = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const phoneNumber = `+91${phone}`;

    try {
      // Reset reCAPTCHA before sending OTP
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired. Resetting...");
          sendOTP(); // Auto-retry
        },
      });

      // 🔹 Send OTP
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setStep(2); // Move to OTP screen
      console.log("✅ OTP sent successfully!");
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  // 🔹 Function to Verify OTP
  const verifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      alert("✅ Login Successful!");
      // Redirect or update UI after successful login
    } catch (error) {
      alert("❌ Invalid OTP. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center bg-gradient-to-b from-pink-100 to-white min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          {/* 🔹 Top Banner */}
          <div className="relative w-full h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl overflow-hidden">
            <img src="../loginbanner.webp" alt="Banner" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-lg font-semibold my-4">
            {step === 1 ? "Sign Up to view your profile" : "Enter OTP"}
          </h2>

          {step === 1 ? (
            <>
              {/* 🔹 Phone Number Input */}
              <div className="text-left text-gray-600 text-sm mb-1">Country</div>
              <div className="flex border rounded-lg p-2 items-center">
                <span className="font-bold text-gray-700 px-2">+91</span>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <button
                onClick={sendOTP}
                className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold"
              >
                Continue
              </button>
              <div id="recaptcha-container"></div>
            </>
          ) : (
            <>
              {/* 🔹 OTP Input */}
              <div className="flex justify-center space-x-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-10 h-10 border rounded text-center text-lg"
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[i] = e.target.value;
                      setOtp(newOtp.join(""));
                    }}
                  />
                ))}
              </div>
              <button
                onClick={verifyOTP}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
