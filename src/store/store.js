import { configureStore  } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import cartReducer from './cartSlice.js';
import { combineReducers } from 'redux';
import wishListSlice from './wishListSlice.js'  
import { persistReducer,persistStore } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import orderSlice from './orderSlice.js';


const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishListSlice,
    order: orderSlice,
});

const persistConfig = {
    key: "root",
    storage: sessionStorage,
    whitelist: ["cart", "auth", "wishlist"], // State slices to persist
  };
  
const persistedReducer  = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;

