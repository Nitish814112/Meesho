import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  return response.json();
});

// Fetch categories
export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  return response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // All products
    filteredItems: [], // Filtered products
    cartItems: [], // ✅ Cart state
    categories: [],
    structuredCategories: {}, // Stores categories with subcategories
    status: "idle",
    categoryStatus: "idle",
    error: null,
    categoryError: null,
  },
  reducers: {
    // ✅ Add to Cart
    addToCart: (state, action) => {
      console.log("action", action); // Log selected product

      const product = action.payload;

      const existingProduct = state.cartItems.find((item) => item.id === product.id);


      if (existingProduct) {
        existingProduct.quantity += 1; // ✅ Increase quantity if already in cart
      } else {
        state.cartItems.push({ ...product, quantity: 1 }); // ✅ Add new product with quantity
      }
    },

    // ✅ Remove from Cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => product.id !== action.payload);
    },

    // ✅ Update Cart Quantity (Increment/Decrement)
    updateCartQuantity: (state, action) => {
      const { id, type } = action.payload;
      const productIndex = state.cartItems.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        if (type === "increase") {
          state.cartItems[productIndex].quantity += 1;
        } else if (type === "decrease") {
          if (state.cartItems[productIndex].quantity > 1) {
            state.cartItems[productIndex].quantity -= 1;
          } else {
            state.cartItems.splice(productIndex, 1); // Remove item if quantity is 0
          }
        }
      }
    },

    // ✅ Filter by Category
    filterByCategory: (state, action) => {
      const categoryName = action.payload.toLowerCase();
      state.filteredItems = state.items.filter((product) =>
        product.category?.name.toLowerCase().includes(categoryName)
      );
    },
  },

  extraReducers: (builder) => {
    // Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoryStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryStatus = "succeeded";
        state.categories = action.payload;

        // ✅ Structure categories dynamically
        const structured = {};
        action.payload.forEach((category) => {
          structured[category.name] = category.subcategories || []; // Assuming API has subcategories
        });
        state.structuredCategories = structured;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryStatus = "failed";
        state.categoryError = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, filterByCategory } = productSlice.actions;
export default productSlice.reducer;
