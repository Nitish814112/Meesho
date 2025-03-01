import Dropdown from "../DropDown/Dropdown";
import {
  categories, Gender, Color, Fabrics, Dial, Size, Price,
  Rating, Occasion, Combo, Discount, Reversible, UsedFor
} from "../../Utility/utility";
import Card from "./Card";
import { useState } from "react";

const filters = [
  { title: "Category", items: categories },
  { title: "Gender", items: Gender },
  { title: "Color", items: Color },
  { title: "Fabric", items: Fabrics },
  { title: "Dial", items: Dial },
  { title: "Size", items: Size },
  { title: "Price", items: Price },
  { title: "Rating", items: Rating },
  { title: "Occasion", items: Occasion },
  { title: "Combo", items: Combo },
  { title: "Discount", items: Discount },
  { title: "Reversible", items: Reversible },
  { title: "Used For", items: UsedFor }
];

const CartSection = ({items,status,error,filteredResults}) => {
  
  const [selectedFilters, setSelectedFilters] = useState({});
  console.log("filteredResults",filteredResults);
  

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // Filter products based on selected filters
  const filteredProducts = items.filter((product) => {
    return Object.entries(selectedFilters).every(([filterType, selectedValues]) => {
      if (selectedValues.length === 0) return true; // No filter applied

      if (filterType === "Category") return selectedValues.includes(product.category?.name);
      if (filterType === "Gender") return selectedValues.includes(product.gender);
      if (filterType === "Color") return selectedValues.includes(product.color);
      if (filterType === "Fabric") return selectedValues.includes(product.fabric);
      if (filterType === "Size") return selectedValues.includes(product.size);
      if (filterType === "Price") return selectedValues.includes(product.price);
      if (filterType === "Rating") return selectedValues.includes(product.rating);
      if (filterType === "Occasion") return selectedValues.includes(product.occasion);
      if (filterType === "Combo") return selectedValues.includes(product.combo);
      if (filterType === "Discount") return selectedValues.includes(product.discount);
      if (filterType === "Reversible") return selectedValues.includes(product.reversible);
      if (filterType === "Used For") return selectedValues.includes(product.usedFor);
      
      return true;
    });
  });

  const displayProducts = filteredResults !== undefined && filteredResults.length > 0 ? filteredResults : filteredProducts;


  return (
    <div className="grid grid-cols-12 ">
      {/* Filter Sidebar */}
      <div className="border md:col-start-1 md:col-end-4  md:ml-16 ml-2 min-w-[250px]">
        <div className="filter ml-6 border-b-2 py-4">
          <h3 className="font-semibold">FILTERS</h3>
          <small className="text-gray-300 font-bold">{filteredProducts.length} Products</small>
        </div>

        {/* Multiple Filter Dropdowns */}
        {filters.map((filter, index) => (
          <Dropdown
            key={index}
            title={filter.title}
            items={filter.items}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        ))}
      </div>

      {/* Main Content Section */}
      <div className="md:col-start-4  col-start-5 col-end-12  md:col-end-12 md:flex md:flex-wrap gap-2  md:px-1 lg:px-1 px-1 grid grid-cols-2 ">
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <div key={product.id} className="flex flex-wrap ">
              <Card product={product} />
            </div>
          ))
        ) : (
          <p className="text-center w-full mt-4">No products match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default CartSection;
