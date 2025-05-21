import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../axios/axios";

// Async thunk to fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const response = await api.get("/whishlist");
      console.log("Wishlist response:", response.data);
      
      // Check if the response already contains full product details
      if (response.data.wishlist && response.data.wishlist.length > 0) {
        const firstItem = response.data.wishlist[0];
        if (typeof firstItem === 'object' && firstItem._id) {
          // If items are already full product objects, return them directly
          return response.data.wishlist;
        }
      }

      // If we have IDs, fetch full product details
      const productDetails = await Promise.all(
        response.data.wishlist.map(async (productId) => {
          try {
            const productResponse = await api.get(`/products/${productId}`);
            return productResponse.data;
          } catch (error) {
            console.error(`Error fetching product ${productId}:`, error);
            return null;
          }
        })
      );

      // Filter out any failed product fetches
      return productDetails.filter(product => product !== null);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to toggle wishlist item
export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggleItem",
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await api.post("/whishlist/toggle", { productId });
      console.log("Toggle response:", response.data);

      // If adding to wishlist, fetch the product details
      if (response.data.inWishlist) {
        const productResponse = await api.get(`/products/${productId}`);
        return {
          productId,
          inWishlist: response.data.inWishlist,
          wishlist: response.data.wishlist,
          productDetails: productResponse.data
        };
      }

      return {
        productId,
        inWishlist: response.data.inWishlist,
        wishlist: response.data.wishlist
      };
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchWishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        console.log("Setting wishlist items:", action.payload);
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle toggleWishlistItem
      .addCase(toggleWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        console.log("Updating wishlist after toggle:", action.payload);
        if (action.payload.inWishlist) {
          // Add product to wishlist
          state.items.push(action.payload.productDetails);
        } else {
          // Remove product from wishlist
          state.items = state.items.filter(item => item._id !== action.payload.productId);
        }
        state.loading = false;
      })
      .addCase(toggleWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
