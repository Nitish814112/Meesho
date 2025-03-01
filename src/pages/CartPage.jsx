
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../Redux/productSlice"; // Import your Redux action
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  console.log(isAuthenticated);


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
  console.log("totalDiscount", totalDiscount);
  const total_Discount = totalPrice > 0 ? totalDiscount : 0;
  const orderTotal = totalPrice - total_Discount;


  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 py-2 border-b-2 items-center text-center md:text-left">
        {/* Logo */}
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <img src="../meeshoLogo.svg" alt="logo" className="h-9 w-44 md:w-52" />
        </div>

        {/* Progress Steps */}
        <div className="md:col-span-8 flex justify-center gap-6 mt-3 md:mt-0 text-gray-500">
          {["Cart", "Address", "Payment", "Summary"].map((stepName, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold ${index === 0 ? "border-purple-600 text-purple-600" : "border-gray-300"
                }`}>
                {index + 1}
              </span>
              <span className={`text-sm mt-1 ${index === 0 ? "text-purple-600" : ""}`}>{stepName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-4">
        {/* Left Section: Product Details */}
        <div className="md:col-start-2 md:col-span-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Product Details</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-4 border-b pb-4 my-4">
                {/* Product Image */}
                <img src={item.images[0]} alt={item.title} className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0" />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600"><span className="font-bold">₹</span> {item.price}</p>
                  <p className="text-sm text-gray-500"><span className="font-bold">Quantity:</span> {item.quantity}</p>
                  <p className="text-sm text-gray-500">Desc: Lorem ipsum dolor.</p>

                  <button
                    className="text-red-500 text-sm mt-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ❌ REMOVE
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <button className="bg-gray-200 px-2 py-1 rounded text-lg" onClick={() => handleQuantityChange(item.id, "decrease")}>➖</button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button className="bg-gray-200 px-2 py-1 rounded text-lg" onClick={() => handleQuantityChange(item.id, "increase")}>➕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section: Price Details */}
        <div className="md:col-span-3 bg-white shadow-md p-4 rounded-lg">
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
          <button className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 mt-4 rounded-lg transition duration-200" onClick={() => navigate("/checkout")}>
            Continue
          </button>

          {/* Meesho Safe Info */}
          <div className="mt-4 flex justify-center">
            <img src="../safe.webp" alt="MeeSho Safe" className="w-28 md:w-40" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default CartPage;