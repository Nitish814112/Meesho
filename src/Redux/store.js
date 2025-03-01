import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./productSlice"; // If using separate category slice
import authReducer from "./authSlice";


const store = configureStore({
  reducer: {
    products: productReducer, // Manages products state
    categories: categoryReducer,
    cart: categoryReducer,
    auth: authReducer,
  },
});

export default store;
