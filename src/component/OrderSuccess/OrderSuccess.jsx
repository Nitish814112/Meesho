import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      {/* Success Icon & Message */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg text-black"
      >
        <CheckCircle className="text-green-500 w-16 h-16 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2">Thank you for shopping with us 🎉</p>

        {/* Continue Shopping Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
          >
            Continue Shopping
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
