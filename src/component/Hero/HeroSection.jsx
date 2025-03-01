import React from "react";


const HeroSection = () => {
  return (
    <div className="grid  grid-cols-12 md:gap-4 md:px-4 relative">

      {/* Row 1: Main Hero Section */}
      <div className="leftSide col-start-2 col-end-12 md:col-end-7 row-start-1 flex flex-col justify-center bg-gray-100 p-8 rounded-lg shadow-sm w-full min-h-[350px] md:min-h-[350px] lg:min-h-[400px]">        <div className="text-4xl font-bold mb-4 leading-tight text-gray-900">
          <h1 className="text-[#333]">Lowest Prices</h1>
          <h1 className="text-[#333]">Best Quality Shopping</h1>
        </div>

        {/* Feature Box */}
        <div className="flex items-center bg-white shadow-md rounded-lg px-6 py-3 w-fit">
          <div className="flex items-center gap-2 border-r pr-4">
            <img src="/delivery.svg" alt="Free Delivery" width={24} />
            <span className="text-gray-700 text-sm">Free Delivery</span>
          </div>
          <div className="flex items-center gap-2 border-r px-4">
            <img src="/cash.svg" alt="Cash on Delivery" width={24} />
            <span className="text-gray-700 text-sm">Cash on Delivery</span>
          </div>
          <div className="flex items-center gap-2 px-4">
            <img src="/return.svg" alt="Easy Returns" width={24} />
            <span className="text-gray-700 text-sm">Easy Returns</span>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6">
          <button className="flex items-center gap-3 bg-[#9F2089] text-white font-bold px-5 py-3 rounded-full shadow-lg">
            <img src="/play.png" alt="Download App" className="w-5 h-5" />
            Download the Meesho App
          </button>
        </div>
      </div>

      {/* Right Section (Image Banner) */}
      <div className="rightside hidden md:block col-start-7 col-end-12 row-start-1 min-h-[350px] md:min-h-[350px] lg:min-h-[400px]">
      <img
          src="/getdiscound.webp"
          alt="Discount Offer"
          className="w-full h-full rounded-lg shadow-md"
        />
      </div>

      {/* NEW: Heading "Top Categories to choose from" */}
      <div className=" col-span-12 flex items-center justify-center my-10">
        <div className=" hidden md:block w-1/4 h-[1px] bg-[#C76DA2]"></div>
        <h2 className=" hidden md:block mx-4 md:text-xl lg:text-2xl font-bold text-gray-800">Top Categories to choose from</h2>
        <div className=" hidden md:block w-1/4 h-[1px] bg-[#C76DA2]"></div>
      </div>

{/* Row 2: */}
{/* Row 2 */}
<div
  className="hidden md:flex col-start-2 col-end-12 row-start-3 w-full items-center justify-center py-20 relative"
  style={{
    backgroundImage: "url('./background.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="relative w-full max-w-5xl grid grid-cols-12 gap-4">
    {/* Background Image */}
    <div className="col-span-7 flex justify-center">
      <img 
        src="./abc.webp" 
        className="w-[70%] h-auto rounded-lg shadow-md transform -translate-x-20"
        alt="Background"
      />
    </div>

    {/* Floating Images */}
    <div className="col-span-5 flex flex-col gap-4 pt-20 relative">
      <div className="flex justify-center gap-6">
        <img 
          src="./mens.webp" 
          className="w-[65%] rounded-lg shadow-md pt-24" 
          alt="Men's Store" 
        />
        <img 
          src="./kids.webp" 
          className="w-[65%] rounded-lg shadow-md pt-24" 
          alt="Kid's Store" 
        />
      </div>
    </div>
  </div>
</div>

{/* Row 3 */}
<div
  className="hidden md:flex col-start-2 col-end-12 row-start-4 w-full items-center justify-center py-16 mt-10 relative min-h-[500px]"
  style={{
    backgroundImage: "url('./essential.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="relative w-full max-w-6xl grid grid-cols-12 gap-4 items-center">
    
    {/* Left Section */}
    <div className="col-span-4 flex flex-col items-center justify-center text-center">
      <img src="./viewall.webp" className="h-20" alt="View All" />
    </div>

    {/* Right Section */}
    <div className="col-span-8 grid grid-cols-3 gap-6">
      
      {/* Home Decor */}
      <div className="flex flex-col items-center">
        <div className="rounded-xl shadow-md w-40 h-40 flex items-center justify-center">
          <img src="./pots.webp" className="w-full object-cover rounded-lg" alt="Home Decor" />
        </div>
        <img src="./home.webp" className="mt-16" alt="Home Decor Label" />
      </div>

      {/* Kitchen Appliances */}
      <div className="flex flex-col items-center">
        <div className="rounded-xl shadow-md w-40 h-40 flex items-center justify-center">
          <img src="./jug.webp" className="w-full object-cover rounded-lg" alt="Kitchen Appliances" />
        </div>
        <img src="./kitchen.webp" className="mt-16" alt="Kitchen Label" />
      </div>

      {/* Health Care */}
      <div className="flex flex-col items-center">
        <div className="rounded-xl shadow-md w-40 h-40 flex items-center justify-center">
          <img src="./purna.webp" className="w-full object-cover rounded-lg" alt="Health Care" />
        </div>
        <img src="./health.webp" className="mt-16" alt="Health Care Label" />
      </div>

    </div>
  </div>
</div>

{/* Row 4 */}
<div
  className="hidden md:flex col-start-2 col-end-12 row-start-5 w-full items-center justify-center py-16 mt-10 relative min-h-[500px]"
  style={{
    backgroundImage: "url('./styles.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="relative w-full max-w-6xl grid grid-cols-12 gap-4 items-center">
    
    {/* Left Section */}
    <div className="col-span-4 flex flex-col items-center justify-center text-center">
      <img src="./viewall.webp" className="h-20" alt="View All" />
    </div>

    {/* Right Section */}
    <div className="col-span-8 grid grid-cols-3 gap-6">
      
      {/* Accessories */}
      <div className="flex flex-col items-center">
        <div className="rounded-xl shadow-md w-40 h-40 flex items-center justify-center">
          <img src="./bags.webp" className="w-full object-cover rounded-lg" alt="Accessories" />
        </div>
        <img src="./accessories.webp" className="mt-16" alt="Accessories Label" />
      </div>

      {/* Footwear */}
      <div className="flex flex-col items-center">
        <div className="rounded-xl shadow-md w-40 h-40 flex items-center justify-center">
          <img src="./shoes.webp" className="w-full object-cover rounded-lg" alt="Footwear" />
        </div>
        <img src="./foot.webp" className="mt-16" alt="Footwear Label" />
      </div>

      {/* Electronics */}
      <div className="flex flex-col items-center">
        <div className="rounded-xl shadow-md w-40 h-40 flex items-center justify-center">
          <img src="./iron.webp" className="w-full object-cover rounded-lg" alt="Electronics" />
        </div>
        <img src="./elctronics.webp" className="mt-16" alt="Electronics Label" />
      </div>

    </div>
  </div>
</div>



    </div>
  );
};

export default HeroSection;