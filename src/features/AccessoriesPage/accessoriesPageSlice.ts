import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type/Product";
import { getAccessories } from "../../api/accessories";

type PhonesPageState = {
  accessories: Product[];
  loaded: boolean;
  hasError: { erroreMessage: string; isError: boolean };
};

const initialState: PhonesPageState = {
  accessories: [],
  loaded: false,
  hasError: { erroreMessage: "", isError: false },
};

export const init = createAsyncThunk("accessories/fetch", () => {
  return getAccessories();
});

const AccessoriesPageSlice = createSlice({
  name: "accessories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.accessories = action.payload;
        state.loaded = true;
      }
    );

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError.erroreMessage =
        "Something went wrong. Accessories is not found";
      state.hasError.isError = true;
    });
  },
});

export default AccessoriesPageSlice.reducer;
