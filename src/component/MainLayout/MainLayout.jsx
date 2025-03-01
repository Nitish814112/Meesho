import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import HeroSection from "../Hero/HeroSection";
import CartSection from "../Cart/CartSection";
import Footer from "../Footer/Footer";
import ProductDetail from "../../pages/ProductDetails.jsx";
import CartPage from "../../pages/CartPage.jsx";
import Login from "../../pages/Login.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

function MainLayout({ items, status, error, filteredResults, onSearchResults }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/product/cart"; // Hide Navbar on cart page

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] min-h-screen gap-8">
      {/* Navbar - Hide on Cart Page */}
      {!hideNavbar && (
        <div className="nav w-full top-0 sticky z-10 bg-white shadow">
          <Navbar items={items} onSearchResults={onSearchResults} />
        </div>
      )}

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              {/* Hero Section (Hidden if filteredResults exist) */}
{(filteredResults || []).length === 0 && <HeroSection />}

              {/* Cart Section */}
              <CartSection
                items={Array.isArray(filteredResults) && filteredResults.length > 0 ? filteredResults : Array.isArray(items) ? items : []}
                status={status}
                error={error}
              />

              {/* Footer (Only on Home Page) */}
              <Footer />
            </>
          }
        />

        {/* Other Routes */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/product/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default MainLayout;
