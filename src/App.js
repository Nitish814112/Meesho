import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ProductDetail from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage.jsx";
import Login from "./pages/Login.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/Cart" element={<CartPage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
