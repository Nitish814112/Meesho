import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { loginSuccess } from "../Redux/authSlice";
import Nav from "../component/Navbar/Nav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get previous location

  // Send OTP
  const sendOTP = async () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setStep(2);

    const templateParams = {
      to_name: email,
      otp_code: otpCode,
    };

    try {
      await emailjs.send(
        "service_rg72cc8",
        "template_ufit4nd",
        templateParams,
        "w55HEmj60kOP3v-qE"
      );
      alert(`✅ OTP sent to ${email}!`);
    } catch (error) {
      alert("Failed to send OTP. Try again.");
    }
  };

  // Verify OTP
  const verifyOTP = () => {
    console.log("Entered OTP:", otp);
    console.log("Expected OTP:", generatedOtp);
  
    if (otp === generatedOtp) {
      dispatch(loginSuccess(email));  
      localStorage.setItem("isLoggedIn", "true"); 
      localStorage.setItem("user", email); 
      alert("✅ Login Successful!");
  
      const redirectPath = location.state?.from || "/"; 
      navigate(redirectPath);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
      
      <div className="flex items-center justify-center bg-gradient-to-b from-pink-100 -mt-8 to-white min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <div className="relative w-full h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl overflow-hidden">
            <img src="../loginbanner.webp" alt="Banner" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-lg font-semibold my-4">
            {step === 1 ? "Sign Up to view your profile" : "Enter OTP"}
          </h2>

          {step === 1 ? (
            <>
              <div className="text-left text-gray-600 text-sm mb-1">Email</div>
              <div className="flex border rounded-lg p-2 items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>

              <button
                onClick={sendOTP}
                className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold"
              >
                Continue
              </button>
            </>
          ) : (
            <>
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
