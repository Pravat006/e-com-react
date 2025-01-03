import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const productData = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === productData.id
      );
      if (existingProduct) {
        state.products.push(productData);
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;

      state.products = state.products.filter((item) => item.id !== id);
    },
    clearWishlist: (state) => {
      state.products = [];
     
    },
  },
});
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
