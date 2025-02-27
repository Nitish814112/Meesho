import React, { useRef, useState, useEffect } from "react";
import NavOption from "../NavOptions/NavOption";
import { useDispatch, useSelector } from "react-redux";

const Nav = ({items,onSearchResults}) => {
  const [showMark, setShowMark] = useState(false);
  const [downModel, setDownModel] = useState(false);
  const [profileModel, setProfileModel] = useState(false);
  const [input, setInput] = useState("");
  const [recent, setRecent] = useState([]);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  let profileTimeout, downloadTimeout;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const filterItem = () => {
    return items.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    );
  };

  // Handle search submission
  function handleSubmit(e) {
    e.preventDefault();
    
    if (input.trim() === "") return;
    
    setRecent((prevRecent) => [...new Set([input, ...prevRecent])]); // Avoid duplicates
    setInput("");
  
    let result = filterItem();
  
    if (result.length > 0) {
      onSearchResults(result);
    } else {
      onSearchResults([]);  // Clear previous results when nothing is found
      alert("No items found!"); // Optionally show an alert or update UI
    }
  }

  // Hide recent searches when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowMark(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="nav_parent grid ">
      <div className="nav_items grid sm:grid-cols-12 justify-center items-center mt-5 pb-5 border-b">
        <div className="logo col col-[2/3]">
          <img src="./meeshoLogo.svg" alt="logo" height="36px" width="200px" />
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className="search relative sm:col-[3/6] ml-10 border rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="inputfield flex">
              <div className="magnifying">
                <i className="fa-solid fa-magnifying-glass ml-2 mt-2 text-2xl text-gray-300"></i>
              </div>

              <input
                type="text"
                ref={inputRef}
                className="w-full h-10 outline-none ml-2"
                onFocus={() => setShowMark(true)}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Try Saree, Kurti or Search by Product"
              />

              {/* X Mark (Clear Input) */}
              {showMark && input.length > 0 && (
                <div
                  className="mark cursor-pointer "
                  onClick={() => setInput("")}
                >
                  <i className="fa-solid fa-xmark mr-2 mt-3 text-gray-300  "></i>
                </div>
              )}
            </div>
          </form>

          {showMark && recent.length > 0 && (
            <div className="recentSearch inline absolute top-full left-0 w-full border bg-white shadow-lg rounded-md p-2 z-50">
              <h4 className="font-bold mt-1 ml-2">Popular Searches</h4>

              {/* Recent searches container */}
              <div className="flex flex-wrap gap-2 p-2">
                {recent.map((search, index) => (
                  <p
                    key={index}
                    className="border px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm"
                    onClick={() => setInput(search)}
                  >
                    {search}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Other Navbar Items */}
        <div className="items_contains sm:col-[7/-1] sm:grid sm:grid-cols-3">
          <div className="option_items col-[1/3] flex gap-6">
            <div 
              className="relative listItem flex gap-2 border-r border-gray-400 px-3 justify-center items-center hover:text-[#9F2089] hover:border-b-[2px] hover:border-[#9F2089] border-transparent"
              onMouseEnter={() => {
                clearTimeout(downloadTimeout);
                setDownModel(true);
              }}
              onMouseLeave={() => {
                downloadTimeout = setTimeout(() => setDownModel(false), 200);
              }}
            >
              <img src="./mobilepng.png" alt="app" />
              <h4 className="cursor-pointer">Download App</h4>

              {/* Model (Dropdown) */}
              {downModel && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg border p-4 rounded-md z-10">
                  <h3 className="text-lg font-bold mb-4 cursor-pointer">Download App</h3>
                  <img src="./google.png" alt="Google Play" className="w-full mb-4" />
                  <img src="./app.png" alt="App Store" className="w-full" />
                </div>
              )}
            </div>

            <div className="listItem border-r border-gray-400 px-3 py-2 text-center cursor-pointer">Become Supplier</div>
            <div className="listItem border-r border-gray-400 px-3 py-2 text-center cursor-pointer">Newsroom</div>
          </div>

          {/* Profile & Cart */}
          <div className="item_logo grid grid-cols-2 ml-2 px-3 justify-center items-center relative">
            {/* Profile */}
            <div 
              className="listItem hover:text-[#9F2089] cursor-pointer relative hover:border-b-[2px] hover:border-[#9F2089] border-transparent"
              onMouseEnter={() => {
                clearTimeout(profileTimeout);
                setProfileModel(true);
              }}
              onMouseLeave={() => {
                profileTimeout = setTimeout(() => setProfileModel(false), 200);
              }}
            >
              <i className="fa-regular fa-user ml-3 text-xl text-gray-500 hover:text-[#9F2089]"></i>
              <h3>Profile</h3>

              {profileModel && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white shadow-lg border rounded-md p-3 z-10">
                  <div className="profile_child1 flex items-center gap-3 border-b pb-3">
                    <i className="fa-solid fa-user text-lg text-gray-600"></i>
                    <div className="desc">
                      <h3 className="font-bold">Hello User</h3>
                      <small className="text-gray-500">+91 886069143</small>
                    </div>
                  </div>
                  <div className="profile_child2 flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer border-b">
                    <i className="fa-solid fa-bag-shopping text-lg text-gray-600"></i>
                    <h3>My Orders</h3>
                  </div>
                  <div className="profile_child3 flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer border-b">
                    <h3>Delete Account</h3>
                  </div>
                  <div className="profile_child4 flex items-center gap-2 hover:bg-red-100 p-2 cursor-pointer">
                    <i className="fa-solid fa-right-from-bracket text-lg text-red-600"></i>
                    <h3 className="text-red-600">Logout</h3>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative listItem">
  {/* Cart Icon */}
  <i className="fa-solid fa-cart-shopping text-2xl text-gray-500"></i>

  {/* Cart Count Badge (Only shows if cartItems.length > 0) */}
  {cartItems.length > 0 && (
    <span className="absolute -top-2 right-16 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      {cartItems.length}
    </span>
  )}

  {/* Cart Text */}
  <h3>Cart</h3>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
