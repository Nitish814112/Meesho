import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { loginSuccess } from "../Redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for OTP inputs
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState(1);
  const inputRefs = useRef([]); // Store input references
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      app_name:'Meesho'
    };

    try {
      await emailjs.send(
        "service_rg72cc8", // service id Emailjs
        "template_ufit4nd", // template id 
        templateParams,
        "w55HEmj60kOP3v-qE" // key
      );
      alert(`✅ OTP sent to ${email}!`);
    } catch (error) {
      alert("Failed to send OTP. Try again.");
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index > 0) {
      if (!otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Verify OTP
  const verifyOTP = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
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
    <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-260px)] bg-gradient-to-b from-pink-100 to-white px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg text-center">
        {/* Banner */}
        <div className="relative w-full h-32 sm:h-40 md:h-48 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl ">
          <img src="../loginbanner.webp" alt="Banner" className="w-full h-full object-cover" />
        </div>

        {/* Heading */}
        <h2 className="text-lg font-semibold my-4 sm:text-xl">
          {step === 1 ? "Sign Up to view your profile" : "Enter OTP"}
        </h2>

        {/* Step 1: Email Input */}
        {step === 1 ? (
          <>
            <div className="text-left text-gray-600 text-sm mb-1 font-bold">Email</div>
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
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              Continue
            </button>
          </>
        ) : (
          /* Step 2: OTP Input */
          <>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-10 h-10 sm:w-12 sm:h-12 border rounded text-center text-lg"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleBackspace(i, e)}
                  ref={(el) => (inputRefs.current[i] = el)} // Store ref
                />
              ))}
            </div>

            <button
              onClick={verifyOTP}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
