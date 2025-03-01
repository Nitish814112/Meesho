import React, { useRef, useState, useEffect } from "react";
import NavOption from "../NavOptions/NavOption";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'


const Navbar = ({ items, onSearchResults }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
  const navigate = useNavigate();
  
  const user = localStorage.getItem("user");
  
  
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true"; // Convert to boolean
  
  const filterItem = () => {
    return items.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    );
  };
  
  const Total_Item=isAuthenticated?cartItems.length:"";
  // Handle search submission
  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    
    setRecent((prevRecent) => [...new Set([input, ...prevRecent])]); // Avoid duplicates
    setInput("");
    
    const result = filterItem();
    onSearchResults(result.length > 0 ? result : []);
    if (result.length === 0) alert("No items found!");
  }

  function handleLogout() {
    dispatch(logout(user));
    alert("Logged out successfully!");
    localStorage.setItem("isLoggedIn", "false");
    // localStorage.setItem("user", "null");
    navigate("/");
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
    <div className={isAuthenticated?"nav_parent grid sm:grid-rows-[3fr_2fr]":"nav_parent grid sm:grid-rows-1"}>
      <div className="nav_items grid sm:grid-cols-12 justify-center items-center mt-5 pb-5 border-b">
        <div className="logo col col-[2/3]">
        <Link to={'/'}><img src={`${process.env.PUBLIC_URL}/meeshoLogo.svg`}alt="logo" height="36px" width="200px" /></Link>
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

              {/* Clear Input */}
              {showMark && input.length > 0 && (
                <div className="mark cursor-pointer" onClick={() => setInput("")}>
                  <i className="fa-solid fa-xmark mr-2 mt-3 text-gray-300"></i>
                </div>
              )}
            </div>
          </form>

          {showMark && recent.length > 0 && (
            <div className="recentSearch inline absolute top-full left-0 w-full border bg-white shadow-lg rounded-md p-2 z-50">
              <h4 className="font-bold mt-1 ml-2">Popular Searches</h4>
              <div className="flex flex-wrap gap-2 p-2">
                {recent.map((search, index) => (
                  <p key={index} className="border px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm" onClick={() => setInput(search)}>
                    {search}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navbar Options */}
        <div className={`items_contains ${menuOpen ? "show" : ""} sm:col-[7/-1] sm:grid sm:grid-cols-3`}>

          <div className="option_items col-[1/3] flex gap-6">
            <div 
              className="relative listItem flex gap-2  border-r border-gray-400 px-3 justify-center items-center hover:text-[#9F2089] hover:border-b-[2px] hover:border-[#9F2089]"
              onMouseEnter={() => { clearTimeout(downloadTimeout); setDownModel(true); }}
              onMouseLeave={() => { downloadTimeout = setTimeout(() => setDownModel(false), 200); }}
            >
              <img src={`${process.env.PUBLIC_URL}/mobilepng.png`} alt="app" />
              <h4 className="cursor-pointer">Download App</h4>

              {downModel && (
                <div className="absolute sm:top-full sm:left-1/2 -translate-x-1/2 mt-2 w-48 bg-white  sm:shadow-lg sm:border sm:p-4 rounded-md z-10">
                  <h3 className="text-lg font-bold mb-4 cursor-pointer">Download App</h3>
                  <a href="https://play.google.com/store/apps/details?id=com.meesho.supply&hl=en_IN&pli=1" target="_blank"><img src={`${process.env.PUBLIC_URL}/google.png`} alt="Google Play" className="w-full mb-4" /></a>
                 <a href="https://apps.apple.com/us/app/meesho-online-shopping/id1457958492" target="_blank"> <img src={`${process.env.PUBLIC_URL}/app.png`}  alt="App Store" className="w-full" /></a>
                </div>
              )}
            </div>

            <div className="listItem border-r border-gray-400 px-3 py-4 text-center cursor-pointer">Become Supplier</div>
            <div className="listItem border-r border-gray-400 px-3 py-4 text-center cursor-pointer">Newsroom</div>
          </div>

          {/* Profile & Cart */}
          <div className="item_logo grid grid-cols-2 ml-2 px-3 justify-center items-center relative">
            {/* Profile */}
            <div 
              className="listItem hover:text-[#9F2089] cursor-pointer relative"
              onMouseEnter={() => { clearTimeout(profileTimeout); setProfileModel(true); }}
              onMouseLeave={() => { profileTimeout = setTimeout(() => setProfileModel(false), 200); }}
            >
              <i className="fa-regular fa-user ml-3 text-xl text-gray-500 hover:text-[#9F2089]"></i>
              <h3>Profile</h3>

              {profileModel && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white shadow-lg border rounded-md p-3 z-10">
                  <div className="profile_child1 flex items-center gap-3 border-b pb-3">
                    <i className="fa-solid fa-user text-lg text-gray-600"></i>
                    {!isAuthenticated ? <a href="/login">Login</a> : <div className="desc"><h3 className="font-bold">Hello</h3><small className="text-gray-500">{user}</small></div>}
                  </div>
                  <div className="profile_child4 flex items-center gap-2 hover:bg-red-100 p-2 cursor-pointer">
                    {isAuthenticated && <h3 className="text-red-600" onClick={handleLogout}>Logout</h3>}
                  </div>
                </div>
              )}
            </div>

            
            
            {/* Cart */}
            <div className="relative listItem">
              <Link to={'/product/cart'}>
              <i className="fa-solid fa-cart-shopping text-2xl text-gray-500"></i>
              {cartItems.length > 0 && isAuthenticated ? (<span className="absolute -top-2 right-16 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{Total_Item}</span>):""}
              <h3>Cart</h3>
              </Link>
            </div>
          </div>
          
        </div>
        <div id="bar" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </div>
      </div>
      {isAuthenticated && <NavOption />}

      </div>
  );
};

export default Navbar;
