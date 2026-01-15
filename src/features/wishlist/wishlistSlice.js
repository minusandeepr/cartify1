import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetWishlist,
  apiToggleWishlist,
} from "../../api/wishlist";

/* =======================
   FETCH WISHLIST
======================= */
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
      return await apiGetWishlist();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load wishlist"
      );
    }
  }
);

/* =======================
   TOGGLE WISHLIST ITEM
======================= */
export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggle",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    try {
      return await apiToggleWishlist(productId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Wishlist update failed"
      );
    }
  }
);

/* =======================
   REMOVE ITEM (EXPLICIT)
======================= */
export const removeWishlistItem = createAsyncThunk(
  "wishlist/remove",
  async (productId, { rejectWithValue }) => {
    try {
      // toggle API removes if exists
      return await apiToggleWishlist(productId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove wishlist item"
      );
    }
  }
);

/* =======================
   SLICE
======================= */
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* fetch */
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
  state.loading = false;

  state.products = Array.isArray(action.payload.products)
    ? action.payload.products
    : [];
})

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* toggle */
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
  state.products = Array.isArray(action.payload.products)
    ? action.payload.products
    : [];
})


      /* remove */
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
  state.products = Array.isArray(action.payload.products)
    ? action.payload.products
    : [];
})

  },
});

export default wishlistSlice.reducer;
