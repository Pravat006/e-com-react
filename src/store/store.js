import { configureStore  } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.js';
import cartReducer from '../slices/cartSlice.js';
import { combineReducers } from 'redux';
import wishListSlice from '../slices/wishListSlice.js'  
import { persistReducer,persistStore } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import orderSlice from '../slices/orderSlice.js';


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
  
const persistReducer= persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: rootReducer,
});
export const persistor = persistStore(store);
export default store;

