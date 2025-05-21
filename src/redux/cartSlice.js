import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addCartItem,
  removeCartItem,
  updateCartQuantity,
  clearCartItems,
} from "./cartActions";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // extraReducers for clearCartItems
      .addCase(clearCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
  },
});

export default cartSlice.reducer;
