import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar/Navbar';
import HeroSection from './component/Hero/HeroSection';
import CartSection from './component/Cart/CartSection';
import Footer from './component/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './Redux/productSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] min-h-screen gap-8">
      {/* Navbar */}
      <div className="nav w-full top-0 sticky z-10 bg-white shadow">
        <Navbar items={items} onSearchResults={setFilteredResults} />
      </div>

      {/* Hero Section (Hidden if filteredResults exist) */}
      {filteredResults.length === 0 && (
        <div className="w-full">
          <HeroSection />
        </div>
      )}

      {/* Cart Section (Displays results if filteredResults exist) */}
      <div className="cart w-full">
        <CartSection 
          items={filteredResults.length > 0 ? filteredResults : items} 
          status={status} 
          error={error} 
        />
      </div>

      {/* Footer */}
      <div className="footer w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
