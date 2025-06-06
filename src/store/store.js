import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice.js';
import { combineReducers } from 'redux';
import wishListSlice from '../slices/wishListSlice.js';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import orderSlice from '../slices/orderSlice.js';


const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishListSlice,
    order: orderSlice,
});

const persistConfig = {
    key: "root",
    storage, // use localStorage instead of sessionStorage
    whitelist: ["cart", "auth", "wishlist"], // State slices to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});
export const persistor = persistStore(store);


