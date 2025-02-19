import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerService from "../services/customer.service.js";
import couponService from "@/services/coupon.service.js";
import toast from "react-hot-toast";

// asyncthunk to fetch cart data from the Api
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async function (_, { rejectWithValue }) {
    try {
      const response = await CustomerService.myCart();
      if (response) {
        console.log("cart response : ", response);
      }
      
      return response?.data;
    } catch (error) {
      console.log("failed to fetch the cart from server");
      return rejectWithValue(error.response.message || "Failed to fetch cart");
    }
  }
);

// asyncthunk to add item to the cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await CustomerService.addToCart(productId, { "quantity": 1 });
      if (response) {
        console.log("new product added to cart");
        toast.success("Product added to cart")
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add item to cart"
      );
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productid, { rejectWithValue }) => {
    try {
      console.log(
        "product id after remove item from cart called : ",
        productid
      );
      const response = await CustomerService.removeItem(productid);
      if (response) {
        console.log("product removed from  cart");
      }
      console.log("after remove res :", response?.data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to remove item from cart"
      );
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await CustomerService.addToCart(productId, {
        "quantity": quantity
      });
      
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to update item quantity"
      );
    }
  }
);
export const emptyCart = createAsyncThunk(
  "cart/emptyCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CustomerService.clearCart();
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to clear the cart "
      );
    }
  }
);
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (couponName, { rejectWithValue }) => {
    try {
      const response = await couponService.applyCoupon({
        couponCode: couponName.toString()
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to apply the couponCode"
      );
    }
  }
);
export const removeCoupon = createAsyncThunk(
  "cart/removeCoupon",
  async (couponName, { rejectWithValue }) => {
    try {
      const response = await couponService.removeCoupon({
        couponCode: couponName.toString()
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to remove the couponCode"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartTotal: 0,
    discountedTotal: 0,
    coupon: null,
    status: "idle",
    error: null,
  },
  reducers: {
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      // recalculating the tatals
      state.cartTotal = state.items.reduce(
        (total, existingItem) =>
          total + existingItem.product.price * existingItem.quantity,
        0
      );
      state.discountedTotal =
        state.cartTotal - (state.coupon?.discountValue || 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const { items, cartTotal, discountedTotal, coupon } = action.payload;
        state.items = items;
        state.cartTotal = cartTotal;
        state.discountedTotal = discountedTotal;
        state.coupon = coupon;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //add item to cart at updating condition
      .addCase(addItemToCart.pending, (state) => {
        state.status = "updating";
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const { items, cartTotal, discountedTotal, coupon } = action.payload;
        state.items = items;
        state.cartTotal = cartTotal;
        state.discountedTotal = discountedTotal;
        state.coupon = coupon;
        state.status = "succeeded";
      })
      // Remove item from cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.status = "updating";
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const { items, cartTotal, discountedTotal, coupon } = action.payload;
        state.items = items;
        state.cartTotal = cartTotal;
        state.discountedTotal = discountedTotal;
        state.coupon = coupon;
        state.status = "succeeded";
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // Update item quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = "updating";
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { items, cartTotal, discountedTotal, coupon } = action.payload;
        state.items = items;
        state.cartTotal = cartTotal;
        state.discountedTotal = discountedTotal;
        state.coupon = coupon;
        state.status = "succeeded";
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //
      .addCase(emptyCart.pending, (state) => {
        state.status = "updating";
        state.error = null;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.length === 0) {
          state.items = [];
          state.cartTotal = 0;
          state.discountedTotal = 0;
          state.coupon = null;
          state.status = "succeeded";
        }
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(applyCoupon.pending, (state)=>{
        state.status= "updating"
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        const { items, cartTotal, discountedTotal, coupon } = action.payload;
        state.items = items;
        state.cartTotal = cartTotal;
        state.discountedTotal = discountedTotal;
        state.coupon = coupon;
        state.status = "succeeded";
      })
      .addCase(applyCoupon.rejected, (state)=>{
        state.status= "failed";
        state.error = action.payload
      })
      .addCase(removeCoupon.pending, (state) => {
        state.status = "updating";
        state.error = null;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        const { items, cartTotal, discountedTotal } = action.payload;
        state.items = items;
        state.cartTotal = cartTotal;
        state.discountedTotal = discountedTotal;
        state.coupon = null;
        state.status = "succeeded";
      })
      .addCase(removeCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
