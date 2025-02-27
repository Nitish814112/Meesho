import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div 
      className="rounded-lg shadow-lg p-4 w-60 hover:cursor-pointer" 
      onClick={handleClick} // ✅ Pass function reference, not execution
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full object-fill rounded-md"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-gray-700 font-semibold mt-2 text-sm truncate">
        {product.title}
      </h3>

      {/* Price Section */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-bold text-black">₹{product.price}</span>
        <span className="text-gray-500 line-through text-sm">₹{product.originalPrice}</span>
        <span className="text-green-600 text-sm">{product.discount} off</span>
      </div>

      {/* Free Delivery Tag */}
      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full mt-1 inline-block">
        Free Delivery
      </span>

      {/* Rating Section */}
      <div className="flex items-center gap-1 mt-2">
        <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-md">
          {product.rating}
        </span>
        <span className="text-gray-600 text-xs">{product.reviews} Reviews</span>
      </div>
    </div>
  );
};

export default Card;
