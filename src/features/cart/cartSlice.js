import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddToCart,
  apiGetCart,
  apiUpdateCartItem,
  apiRemoveCartItem,
  apiClearCart,
} from "../../api/cart";


function normalizeItems(payload) {
  let items = [];

  if (!payload) return [];
  if (Array.isArray(payload)) items = payload;
  else if (Array.isArray(payload.items)) items = payload.items;
  else if (payload.cart && Array.isArray(payload.cart.items))
    items = payload.cart.items;

  return items.map((item) => ({
    productId: item.productId || item.product?._id,
    name: item.name || item.product?.name,
    price: item.price || item.product?.price,
    quantity: item.quantity,
    image: item.image || item.product?.image || "",
  }));
}

/* ===================== THUNKS ===================== */

// GET /api/cart
export const fetchCartFromServer = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await apiGetCart();
    } catch (err) {
      return rejectWithValue("Failed to load cart");
    }
  }
);

// POST /api/cart
export const addToCartServer = createAsyncThunk(
  "cart/add",
  async (productId, { rejectWithValue }) => {
    try {
      return await apiAddToCart(productId, 1);
    } catch (err) {
      return rejectWithValue("Failed to add to cart");
    }
  }
);

// PATCH /api/cart/:productId
export const updateCartItemOnServer = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await apiUpdateCartItem(productId, quantity);
    } catch (err) {
      return rejectWithValue("Failed to update cart item");
    }
  }
);

// DELETE /api/cart/:productId
export const removeItemFromServer = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      return await apiRemoveCartItem(productId);
    } catch (err) {
      return rejectWithValue("Failed to remove item");
    }
  }
);

// DELETE /api/cart
export const clearCartOnServer = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      return await apiClearCart();
    } catch (err) {
      return rejectWithValue("Failed to clear cart");
    }
  }
);

/* ===================== SLICE ===================== */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchCartFromServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = normalizeItems(action.payload);
      })
      .addCase(fetchCartFromServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addToCartServer.fulfilled, (state, action) => {
        state.items = normalizeItems(action.payload);
      })

      // UPDATE
      .addCase(updateCartItemOnServer.fulfilled, (state, action) => {
        state.items = normalizeItems(action.payload);
      })

      // REMOVE
      .addCase(removeItemFromServer.fulfilled, (state, action) => {
        state.items = normalizeItems(action.payload);
      })

      // CLEAR
      .addCase(clearCartOnServer.fulfilled, (state, action) => {
        state.items = normalizeItems(action.payload);
      });
  },
});

export default cartSlice.reducer;
