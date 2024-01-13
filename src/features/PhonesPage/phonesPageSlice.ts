import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type/Product";
import { getPhones } from "../../api/phones";

type PhonesPageState = {
  phones: Product[];
  loaded: boolean;
  hasError: { erroreMessage: string; isError: boolean };
};

const initialState: PhonesPageState = {
  phones: [],
  loaded: false,
  hasError: { erroreMessage: "", isError: false },
};

export const init = createAsyncThunk("phones/fetch", () => {
  return getPhones();
});

const PhonesPageSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.phones = action.payload;
        state.loaded = true;
      }
    );

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError.erroreMessage =
        "Something went wrong. Phones is not found";
      state.hasError.isError = true;
    });
  },
});

export default PhonesPageSlice.reducer;
