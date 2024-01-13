import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type/Product";
import { getTablets } from "../../api/tablets";

type PhonesPageState = {
  tablets: Product[];
  loaded: boolean;
  hasError: { erroreMessage: string; isError: boolean };
};

const initialState: PhonesPageState = {
  tablets: [],
  loaded: false,
  hasError: { erroreMessage: "", isError: false },
};

export const init = createAsyncThunk("tablets/fetch", () => {
  return getTablets();
});

const TabletsPageSlice = createSlice({
  name: "tablets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.tablets = action.payload;
        state.loaded = true;
      }
    );

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError.erroreMessage =
        "Something went wrong. Tablets is not found";
      state.hasError.isError = true;
    });
  },
});

export default TabletsPageSlice.reducer;
