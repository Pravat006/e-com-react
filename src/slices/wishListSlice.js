import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "@/services/wishlist.service";

// Fetch wishlists
export const fetchWistlists = createAsyncThunk(
  "wishlist/getWistlists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.getWishlists();
     
      return response?.success && response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to fetch wishlists"
      );
    }
  }
);

// Toggle wishlist item (add/remove)
export const toggleWishlists = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await wishlistService.toggleWishlist(productId);
      return res?.success && { productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to toggle wishlist"
      );
    }
  }
);

// Remove a specific item from wishlist
export const removeFromWishlists = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistService.removeFromWishlist(productId);
      return response?.success && { productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to remove from wishlist"
      );
    }
  }
);

// Clear all wishlist items
export const emptyWishlists = createAsyncThunk(
  "wishlist/emptyWishlists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.clearWishlist();
      return response?.success && [];
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to clear wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    loading: false,
    fetched: false, // Tracks if the wishlist has been fetched
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlists
      .addCase(fetchWistlists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWistlists.fulfilled, (state, action) => {
        
        state.loading = false;
        state.wishlists = action.payload
        state.fetched = true; // Mark as fetched
      })
      .addCase(fetchWistlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Wishlist Item
      .addCase(toggleWishlists.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlists.fulfilled, (state, action) => {
        state.loading = false;
        const { productId } = action.payload;
        const index = state.wishlists.findIndex(
          (item) => item.product._id === productId
        );

        if (index !== -1) {
          // Remove from wishlist
          state.wishlists.splice(index, 1);
        } else {
          // Add to wishlist
          state.wishlists.push({ product: { _id: productId } });
        }
      })
      .addCase(toggleWishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Specific Wishlist Item
      .addCase(removeFromWishlists.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlists.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlists = state.wishlists.filter(
          (item) => item.product._id !== action.payload.productId
        );
      })
      .addCase(removeFromWishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Empty Wishlist
      .addCase(emptyWishlists.pending, (state) => {
        state.loading = true;
      })
      .addCase(emptyWishlists.fulfilled, (state) => {
        state.loading = false;
        state.wishlists = [];
      })
      .addCase(emptyWishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
