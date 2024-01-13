import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../type/Product";
import { getArrayUpdates } from "../../helpers/utils/functions";

type FavouritePageState = {
  favourites: Product[];
};

const initialState: FavouritePageState = {
  favourites: [],
};

export const init = createAsyncThunk("favourites/fetch", () => {
  const storedFavouritesString = localStorage.getItem("favourites");

  const storedFavourites = storedFavouritesString
    ? JSON.parse(storedFavouritesString)
    : [];

  return storedFavourites;
});


const favouritesPageSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload; 
      const updatedProducts = getArrayUpdates(state.favourites, product);

      state.favourites = updatedProducts;
      localStorage.setItem("favourites", JSON.stringify(updatedProducts));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.favourites = action.payload;
    });
  },
});

export const { add } = favouritesPageSlice.actions;
export default favouritesPageSlice.reducer;
