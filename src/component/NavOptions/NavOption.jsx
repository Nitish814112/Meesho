import { useState } from "react";
import { motion } from "framer-motion";

const categories = {
    "Women Ethnic": {
        Saree: [
          "All Sarees",
          "Silk Sarees",
          "Banarasi Silk Sarees",
          "Cotton Sarees",
          "Georgette Sarees",
          "Chiffon Sarees",
          "Heavy Work Sarees",
          "Net Sarees",
        ],
        Kurtis: ["All Kurtis", "Anarkali Kurtis", "Rayon Kurtis", "Cotton Kurtis", "Chikankari Kurtis"],
        "Kurta Sets": [
          "All Kurta Sets",
          "Kurta Palazzo Sets",
          "Rayon Kurta Sets",
          "Kurta Pant Sets",
          "Cotton Kurta Sets",
          "Sharara Sets",
        ],
        "Dupatta Sets": ["Cotton Sets", "Rayon Sets", "Printed Sets"],
        "Suits & Dress Material": [
          "All Suits & Dress Material",
          "Cotton Suits",
          "Embroidered Suits",
          "Crepe Suits",
          "Silk Suits",
          "Patiala Suits",
        ],
        Lehengas: ["Lehenga Cholis", "Net Lehenga", "Bridal Lehenga"],
        "Other Ethnic": ["Blouses", "Dupattas", "Lehenga", "Gown", "Skirts & Bottomwear", "Islamic Fashion", "Petticoats"],
      },
      "Women Western": {
        "Topwear":["All Topwear","Tops","Dresses","T-shirts","Jumpsuits"],
        "Bottomwear":["All Bottomwear","Jeans & Jeggings","Palazzos","Shorts","Skirts"],
        "Innerwear":["Bra","Women Innerwear","Briefs"],
        "Sleepwear":["Nightsuits","Women Nightdress"],
        "Maternity Wear":["All Maternity & Feedingwear","Maternity Kurtis & Dresses"],
        "Sports Wear":["All Women Sportwear","Sports Bra"],
      },
      "Men": {
        "Top Wear":["All Top Wear","Tshirts","Shirts","Winter Wear","Jackets","Sweater and Sweatshirts"],
        "Bottom Wear":["Track Pants","All Bottomwear","Jeans","Trousers","Shorts"],
        "Men Accessories":["All Men Accessories","Watches","Belts & Wallets","Jewellery","Bags"],
        "Men Footwear":["Men Footwear","Casual Shoes","Sports Shoes","Flip Flops & Sandals","Formal Shoes","Loafers"],
        "Ethnic Wear":["Kurtas Sets","Ethnic Jackets"],
        "Bottomwear":["Inner & Sleep Wear","All Inner & Sleep Wear","Boxers","Underwears"]
      },
      "Kids": {
        "Boys & Girls 2+ Years":["Dresses","Boys Sets","Girls Sets","Ethnicwear","Nightwear","Winter Wear","Top Wear","Bottomwear"],
        "Infant 0-2 Years":["Rompers","Baby Sets","Ethnicwear"],
        "Toys & Accessories":["Soft Toys","Footwear","Stationery","Watches","Bags & Backpacks"],
        "Baby Care":["Baby Bedding & Accessories","All Baby Care","Newborn Care"]
      },
      "Home & Kitchen" : {
        "Kitchen & Appliances":["View All","Kitchen Tools","Storage & Organizers","Appliances","Cookware","Dinnerware","Bakeware","Glasses & Barware"],
        "Home Furnishing":["Bedsheets","Curtains & Sheers","Pillows, Cushions & Covers","Cushions & Cushion Covers","Carpets & Doormats","Mattress Protectors","Sofa & Diwan Sets","Towels & Bathrobes","Blankets, Quilts & Dohars"]
      },
      "Beauty & Health":[],
      "Jewellery & Accessories":[],
      "Bags & Footwear":[],
      "Electronics":[],
      "Sports & Fitness":[],
      "Car & Motorbike":[],
      "Office & Supplies & Stationery":[],
      "Pet & Supplies":[],
      "Food & Drinks":[],
      "Musical & Instruments" :[],
      "Books":[]
    
    };

const NavOption = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="grid grid-cols-12 pt-2 relative" onMouseLeave={() => setActiveCategory(null)}>
      {/* Navbar Categories */}
      <div className="col-start-2 col-end-12 overflow-hidden">
        <motion.div
          className="flex gap-2 whitespace-nowrap cursor-pointer"
          drag="x"
          dragConstraints={{ left: -1500, right: 0 }}
        >
          {Object.keys(categories).map((category, index) => (
            <div key={index} className="relative" onMouseEnter={() => setActiveCategory(category)}>
              <div className="p-2 font-semibold hover:border-b-2 hover:border-[#9F2089] hover:text-[#9F2089]">
                {category}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Single Fixed Dropdown Container (Ends Exactly at Col 11) */}
      <div
        className={`absolute left-0 top-full col-start-2 col-end-11 bg-white shadow-lg border p-4 grid grid-cols-7 gap-4 z-50 transition-opacity duration-200 ${
          activeCategory ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {activeCategory &&
          Object.entries(categories[activeCategory]).map(([subCategory, items], index) => (
            <div
              key={subCategory}
              className={`rounded-md ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
            >
              <p className="font-semibold text-[#9F2089]">{subCategory}</p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="hover:text-black cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NavOption;
