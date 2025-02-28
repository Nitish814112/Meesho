import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./Redux/productSlice";
import MainLayout from "./component/MainLayout/MainLayout";

function App() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <MainLayout
        items={items}
        status={status}
        error={error}
        filteredResults={filteredResults}
        onSearchResults={setFilteredResults}
      />
    </Router>
  );
}

export default App;
