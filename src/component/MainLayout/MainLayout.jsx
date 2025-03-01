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
import Address from "../Address/Address.jsx";
import OrderSuccess from "../OrderSuccess/OrderSuccess.jsx";
import ErrorPage from "../../pages/ErrorPage.jsx"; // Import ErrorPage

function MainLayout({ items, status, error, filteredResults, onSearchResults }) {
  const location = useLocation();
  const hiddenRoutes = new Set(["/product/cart", "/userAddress", "/ordersuccess"]);
  const hideNavbar = hiddenRoutes.has(location.pathname);

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] min-h-screen gap-8">
      {/* Navbar - Hide on specific pages */}
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
              {filteredResults?.length === 0 && <HeroSection />}
              
              {/* Cart Section */}
              <CartSection
                items={filteredResults?.length > 0 ? filteredResults : items || []}
                status={status}
                error={error}
              />

              {/* Footer (Visible only on Home Page) */}
              <Footer />
            </>
          }
        />

        {/* Other Routes */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userAddress" element={<Address />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        
        {/* Protected Routes */}
        <Route
          path="/product/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        {/* Error Handling Routes */}
        <Route path="/unauthorized" element={<ErrorPage errorCode={401} />} />
        <Route path="*" element={<ErrorPage errorCode={404} />} /> {/* Catch-all for 404 */}
      </Routes>
    </div>
  );
}

export default MainLayout;
