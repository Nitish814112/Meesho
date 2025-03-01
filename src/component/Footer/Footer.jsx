import React from "react";
import { Link } from "react-router-dom";
import "../Footer/footer.css";

const Footer = () => {
  return (
    <footer className="footer_container">
      <div className="footer_grid">
        {/* Company Info */}
        <div className="footer_section">
          <h3>About Us</h3>
          <p>Your one-stop destination for fashion and lifestyle products.</p>
          <Link to="/about">Learn More</Link>
        </div>

        {/* Customer Care */}
        <div className="footer_section">
          <h3>Customer Support</h3>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/returns">Return Policy</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer_section">
          <h3>Follow Us</h3>
          <div className="social_icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="footer_section">
          <h3>Payment Methods</h3>
          <img src="https://i.pinimg.com/originals/65/29/a7/6529a74c68df9e3fbe26892cffd19862.jpg" alt="Payment Methods" className="payment_img" />
        </div>
      </div>
      
      <div className="footer_bottom">
        <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
