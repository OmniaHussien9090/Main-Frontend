// redux/cartActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/carts", {  
          headers: {
            Authorization: `Bearer ${token}`
          } });
   return res.data.cart;
  } 
catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async ({ product, quantity }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post("http://localhost:3000/carts", {
      productId: product._id,
      quantity: quantity, 
      priceAtAddition: product.finalPrice,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    thunkAPI.dispatch(fetchCart()); 
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});


export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (itemId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/carts/${itemId}`, {
       
          headers: {
            Authorization: `Bearer ${token}`
          }
    });
    thunkAPI.dispatch(fetchCart());
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ itemId, type, currentQuantity }, thunkAPI) => {
    const newQuantity = type === "inc" ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      await axios.patch(`http://localhost:3000/carts/${itemId}`, {
        quantity: newQuantity,
      },
     {
          headers: {
            Authorization: `Bearer ${token}`
          }}
        );
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const clearCartItems = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
const token = localStorage.getItem("token");

      await axios.delete("http://localhost:3000/carts/clear", {
          headers: {
            Authorization: `Bearer ${token}`
          }      });

      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

