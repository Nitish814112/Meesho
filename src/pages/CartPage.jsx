import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../Redux/productSlice"; // Import your Redux action
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  
  
  

  console.log(cartItems); // it has 33 product instead of 1
  
  const handleQuantityChange = (id, type) => {
    dispatch(updateCartQuantity({ id, type }));
  };

  // Calculate total price and discount
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((total, item) => {
    const discount = item.originalPrice ? item.originalPrice - item.price : 10; // Default ₹10 if no originalPrice
    return total + discount;
  }, 0) || 10;
  console.log("totalDiscount",totalDiscount);
  const total_Discount=totalPrice>0?totalDiscount:0;
  const orderTotal = totalPrice - total_Discount;
  

  return (
    <div className="container mx-auto p-6 flex flex-wrap justify-center items-center mb-4">
      {/* Header Section */}
      <div className="grid grid-cols-12 py-2 border-b-2">
      <div className="col-start-2 ">
      <img src="../meeshoLogo.svg" alt="logo" height="36px" width="200px" />
      </div>
        
        {/* Progress Steps */}
        <div className="   col-start-5 col-end-9 flex justify-center items-center gap-8    text-gray-500">
          <div className="flex flex-col items-center">
            <span className="w-6 h-6 rounded-full border-2 border-purple-600 flex items-center justify-center text-purple-600 font-bold">1</span>
            <span className="text-sm mt-1 text-purple-600">Cart</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">2</span>
            <span className="text-sm mt-1">Address</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">3</span>
            <span className="text-sm mt-1">Payment</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">4</span>
            <span className="text-sm mt-1">Summary</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 mt-4">
        {/* Left Section: Product Details */}
        <div className=" col-start-2 col-span-5 bg-white  p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Product Details</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4 my-4">
                {/* Product Image */}
                <img src={item.images[0]} alt={item.title} className="w-40 h-40" />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600"><span className="font-bold">₹</span> {item.price}</p>
                  <p className="text-sm text-gray-500"> <span className="font-bold">Quantity:</span> {item.quantity}</p>
                  <p className="text-sm text-gray-500">Desc: Lorem, ipsum dolor.</p>
                  <button
                    className="text-red-500 text-sm mt-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ❌ REMOVE
                  </button>
                </div>

                {/* Edit Option */}
                <div className="flex items-center mt-2 gap-2">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded text-lg"
                      onClick={() => handleQuantityChange(item.id, "decrease")}
                    >
                      ➖
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded text-lg"
                      onClick={() => handleQuantityChange(item.id, "increase")}
                    >
                      ➕
                    </button>
                  </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section: Price Details */}
        <div className="col-span-3 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Price Details ({cartItems.length} Items)</h2>

          <div className="flex justify-between mt-4">
            <span>Total Product Price</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between text-green-600 mt-2">
            <span>Total Discounts</span>
            <span>-₹{total_Discount}</span> 
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold text-lg">
            <span>Order Total</span>
            <span>₹{orderTotal}</span>
          </div>

          <p className="bg-green-100 text-green-600 text-sm p-2 mt-2 rounded">
            ✅ Yay! Your total discount is ₹{total_Discount}
          </p>

          {/* Continue Button */}
          <button
            className="bg-purple-600 text-white w-full py-2 mt-4 rounded-lg"
            onClick={() => navigate("/checkout")}
          >
            Continue
          </button>

          {/* Meesho Safe Info */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <img src="../safe.webp" alt="MeeSho Safe" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;