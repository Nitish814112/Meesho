import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/productSlice"; 

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState({
    name: "Nitish",
    details:
      "House no 5 gali no B2, near Nandhidham gaushala Ashok vihar phase 3, behind om sweets, Gurgaon, Haryana, 122001",
    phone: "8860669143",
  });

  const [formData, setFormData] = useState(address);

  const handleEdit = () => {
    setFormData(address);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAddress(formData);
    setShowForm(false);
  };

  const handleDeliver = () => {
    dispatch(clearCart()); // Clear the cart
    navigate("/ordersuccess"); // Redirect to order success page
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center p-6">
      {/* Navbar */}
      <div className="w-full bg-white py-3 px-6 flex justify-between items-center border-b">
        {/* Logo */}
        <img src="../meeshoLogo.svg" alt="logo" className="h-9 w-44 md:w-52" />

        {/* Progress Steps */}
        <div className="md:col-span-8 flex justify-center items-center gap-6 mt-3 md:mt-0 text-gray-500 w-full">
          {["Cart", "Address", "Payment", "Summary"].map((stepName, index) => (
            <div key={index} className="flex flex-col items-center">
              <span
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold ${
                  index === 0 ? "border-purple-600 text-purple-600" : "border-gray-300"
                }`}
              >
                {index + 1}
              </span>
              <span className={`text-sm mt-1 ${index === 0 ? "text-purple-600" : ""}`}>
                {stepName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Address Section */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4">Select Delivery Address</h2>

        {/* Add New Address */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-purple-600 font-semibold"
            onClick={() => setShowForm(true)}
          >
            + ADD NEW ADDRESS
          </button>
        </div>

        {/* Address Form */}
        {showForm && (
          <form className="mb-4 p-4 border border-purple-300 rounded-lg bg-purple-50">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              onClick={handleSave}
            >
              Save Address
            </button>
          </form>
        )}

        {/* Saved Address */}
        {!showForm && (
          <div className="p-4 border border-purple-300 rounded-lg bg-purple-50">
            <div className="flex items-start gap-4">
              <input type="radio" checked className="mt-1 text-purple-600" readOnly />
              <div>
                <h3 className="font-bold">{address.name}</h3>
                <p className="text-sm text-gray-700">{address.details}</p>
                <p className="text-sm font-semibold text-gray-600">{address.phone}</p>
              </div>
              <button className="text-purple-600 font-semibold ml-auto" onClick={handleEdit}>
                EDIT
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-4 w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700"
          onClick={handleDeliver}
        >
          Deliver to this Address
        </button>
      </div>
    </div>
  );
};

export default Address;
