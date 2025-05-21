import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: JSON.parse(localStorage.getItem("wishlist")) || [], // Array of product variant IDs
    productsData: JSON.parse(localStorage.getItem("wishlistProducts")) || [], // Array of full product objects
  },
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload.ids || [];
      state.productsData = action.payload.products || [];
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      localStorage.setItem(
        "wishlistProducts",
        JSON.stringify(state.productsData)
      );
    },

    toggleItem: (state, action) => {
      const { id, product } = action.payload;

      // Check if the variant already exists in wishlist
      const variantExists = state.items.includes(id);
      // Check if the same product (different variant) exists
      const productExists = state.productsData.some(
        (p) => p.productId === product.productId
      );

      if (variantExists || productExists) {
        // Remove all variants of this product
        state.items = state.items.filter((itemId) => {
          const prod = state.productsData.find((p) => p._id === itemId);
          return !prod || prod.productId !== product.productId;
        });
        state.productsData = state.productsData.filter(
          (p) => p.productId !== product.productId
        );
      } else {
        // Add new item
        state.items.push(id);
        state.productsData.push(product);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.items));
      localStorage.setItem(
        "wishlistProducts",
        JSON.stringify(state.productsData)
      );
    },

    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.productsData.some(
        (p) => p._id === product._id || p.productId === product.productId
      );

      if (!exists) {
        state.items.push(product._id);
        state.productsData.push(product);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
        localStorage.setItem(
          "wishlistProducts",
          JSON.stringify(state.productsData)
        );
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((itemId) => itemId !== id);
      state.productsData = state.productsData.filter(
        (product) => product._id !== id
      );
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      localStorage.setItem(
        "wishlistProducts",
        JSON.stringify(state.productsData)
      );
    },

    clearWishlist: (state) => {
      state.items = [];
      state.productsData = [];
      localStorage.removeItem("wishlist");
      localStorage.removeItem("wishlistProducts");
    },
  },
});
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

export const {
  setWishlist,
  toggleItem,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
