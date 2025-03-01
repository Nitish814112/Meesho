import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../Redux/productSlice";



const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Select products and user authentication state from Redux
  const { items, status, error } = useSelector((state) => state.products);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn) || localStorage.getItem("isLoggedIn") === "true";
  console.log("isLoggedIn,isLoggedIn");  // result is coming as "isLoggedIn" text istead of true or false


  const [product, setProduct] = useState(null);
  let size = ["XS", "S", "M", "XL", "XXL"];

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (items.length > 0) {
      const foundProduct = items.find((product) => product.id === Number(id));
      setProduct(foundProduct || null);
    }
  }, [id, items]);

  if (status === "loading") return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  // ✅ Handle Add to Cart with Login Check
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("⚠️ Please log in to add items to your cart.");
      navigate("/login"); // 🔹 Redirect to Login if not logged in
    } else {
      dispatch(addToCart(product));
      console.log("Adding to cart:", product);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* Left Section - Product Images */}
        <div className="md:col-span-4 flex flex-col items-center">
          <img src={product.images[0]} alt={product.name} className="w-full md:w-80 h-64 md:h-96 object-cover rounded-lg shadow-md" />

          {/* Thumbnails */}
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {product.thumbnails?.map((thumb, index) => (
              <img key={index} src={thumb} alt="thumbnail" className="w-16 h-16 border p-1 rounded-md cursor-pointer hover:border-purple-500 transition" />
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="md:col-span-8">
          <h1 className="text-xl md:text-2xl font-bold">{product.title}</h1>
          <p className="text-lg md:text-2xl font-semibold text-green-600">₹{product.price}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 my-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">{product.rating} ★★★★</span>
            <p className="text-gray-600 text-sm md:text-base">{product.reviews} Ratings, {product.totalReviews} Reviews</p>
          </div>

          <p className="text-xs md:text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">Free Delivery</p>

          {/* Size Selection */}
          <div className="mt-4">
            <h3 className="font-semibold text-base md:text-lg">Select Size</h3>
            <div className="flex gap-2 md:gap-4 mt-2 flex-wrap">
              {size.map((size) => (
                <button key={size} className="border px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base hover:bg-gray-200 transition">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-4">
            <h3 className="font-semibold text-base md:text-lg">Product Details</h3>
            <p><strong>Details:</strong> {product.description}</p>
            <p><strong>Sleeve Length:</strong> {Math.floor(Math.random() * 90) + 10}</p>
            <p><strong>Pattern:</strong> Lorem ipsum dolor sit.</p>
            <p><strong>Combo:</strong> Lorem, ipsum.</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-6">
            {/* Add to Cart Button */}
            <button onClick={handleAddToCart} className="bg-purple-600 text-white px-5 md:px-6 py-2 rounded flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto">
              🛒 Add to Cart
            </button>

            {/* Buy Now Button */}
            <button className="bg-purple-800 text-white px-5 md:px-6 py-2 rounded flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto">
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductDetail;