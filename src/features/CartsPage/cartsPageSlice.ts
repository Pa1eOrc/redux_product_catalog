import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../type/Product";

type CartsPageState = {
  carts: Product[];
};

const initialState: CartsPageState = {
  carts: [],
};

export const init = createAsyncThunk("carts/fetch", () => {
  const storedFavouritesString = localStorage.getItem("carts");

  const storedFavourites = storedFavouritesString
    ? JSON.parse(storedFavouritesString)
    : [];

  return storedFavourites;
});

const cartsPageSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
      const updatedCarts = [...state.carts, product];

      state.carts = updatedCarts;
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
    },

    take: (state, action: PayloadAction<{ updatedCarts: Product[] }>) => {
      const { updatedCarts } = action.payload;

      state.carts = updatedCarts;
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
    },

    deletaAll: (
      state,
      action: PayloadAction<{ updatedCarts: Product[] }>
    ) => {
      const { updatedCarts } = action.payload;

      state.carts = updatedCarts;
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.carts = action.payload;
    });
  },
});

export const { add, take, deletaAll } = cartsPageSlice.actions;
export default cartsPageSlice.reducer;
