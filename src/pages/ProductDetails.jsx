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
      <div className="container mx-auto p-6 grid grid-cols-12 gap-8">
        {/* Left Section - Product Images */}
        <div className="col-span-4 flex flex-col items-center">
          <img src={product.images[0]} alt={product.name} className="w-80 h-96 object-cover" />
          <div className="flex gap-2 mt-2">
            {product.thumbnails?.map((thumb, index) => (
              <img key={index} src={thumb} alt="thumbnail" className="w-16 h-16 border p-1" />
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="col-span-8">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold text-green-600">₹{product.price}</p>
          <div className="flex items-center gap-2 my-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded">{product.rating} ★★★★</span>
            <p className="text-gray-600">{product.reviews} Ratings, {product.totalReviews} Reviews</p>
          </div>
          <p className="text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">Free Delivery</p>

          {/* Size Selection */}
          <div className="mt-4">
            <h3 className="font-semibold">Select Size</h3>
            <div className="flex gap-4 mt-2">
              {size.map((size) => (
                <button key={size} className="border px-4 py-2 rounded hover:bg-gray-200">{size}</button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-4">
            <h3 className="font-semibold">Product Details</h3>
            <p><strong>Details:</strong> {product.description}</p>
            <p><strong>Sleeve Length:</strong>{Math.floor(Math.random() * 90) + 10}</p>
            <p><strong>Pattern:</strong>Lorem ipsum dolor sit.</p>
            <p><strong>Combo:</strong> Lorem, ipsum. </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            {/* ✅ Updated Add to Cart button with Login Check */}
            <button onClick={handleAddToCart} className="bg-purple-600 text-white px-6 py-2 rounded flex items-center gap-2">
              🛒 Add to Cart
            </button>

            <button className="bg-purple-800 text-white px-6 py-2 rounded flex items-center gap-2">
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;