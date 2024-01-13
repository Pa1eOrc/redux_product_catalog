import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type/Product";
import {
  getProducts,
  getBrandNewProducts,
  getHotPriceProducts,
} from "../../api/products";

type HomePageState = {
  products: Product[];
  hotPriceProducts: Product[];
  brandNewProducts: Product[];
  loaded: boolean;
  hasError: { erroreMessage: string; isError: boolean };
};

const initialState: HomePageState = {
  products: [],
  hotPriceProducts: [],
  brandNewProducts: [],
  loaded: false,
  hasError: { erroreMessage: "", isError: false },
};

export const init = createAsyncThunk("products/fetch", () => {
  return getProducts();
});

const HomePageSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.hotPriceProducts = getHotPriceProducts(action.payload);
        state.brandNewProducts = getBrandNewProducts(action.payload);
        state.loaded = true;
      }
    );

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError.erroreMessage =
        "Something went wrong. Products is not found";
      state.hasError.isError = true;
    });
  },
});

export default HomePageSlice.reducer;
