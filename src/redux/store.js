// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishList';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // تأكد من أن اسم المفتاح هنا هو "wishlist"
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

