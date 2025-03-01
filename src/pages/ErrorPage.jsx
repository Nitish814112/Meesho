import React from "react";
import { Link, useLocation } from "react-router-dom";

const ErrorPage = ({ errorCode, message }) => {
  const location = useLocation();
  let errorMessage = message;

  if (!errorMessage) {
    switch (errorCode) {
      case 401:
        errorMessage = "You are not authorized to view this page.";
        break;
      case 404:
        errorMessage = `The page "${location.pathname}" does not exist.`;
        break;
      default:
        errorMessage = "An unexpected error occurred. Please try again.";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600">{errorCode || "Error"}</h1>
      <p className="text-xl text-gray-700 mt-4">{errorMessage}</p>
      
      <Link to="/" className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
