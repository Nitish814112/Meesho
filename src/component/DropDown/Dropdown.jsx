import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ title, items, selectedFilters, setSelectedFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (item) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[title]) {
        updatedFilters[title] = [];
      }

      if (updatedFilters[title].includes(item)) {
        updatedFilters[title] = updatedFilters[title].filter((i) => i !== item);
      } else {
        updatedFilters[title].push(item);
      }

      return updatedFilters;
    });
  };

  return (
    <div className="px-6 py-3 w-full relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 pl-6 pr-10 text-left font-semibold bg-white border-b-2 flex justify-between items-center"
      >
        <span>{title}</span>
        <span className="ml-auto text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10 max-h-64 overflow-auto">
          {items.map((ele, i) => (
            <li key={i} className="px-6 py-2 flex items-center hover:bg-gray-200 cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedFilters[title]?.includes(ele) || false}
                onChange={() => handleCheckboxChange(ele)}
              />
              <span>{ele}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
