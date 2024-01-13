import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsDetails } from "../../api/productDetails";
import { ProductDeatails } from "../../type/ProductDetails";

type DetailsPageState = {
  productDetails: ProductDeatails;
  loaded: boolean;
  hasError: { erroreMessage: string; isError: boolean };
};

const initialState: DetailsPageState = {
  productDetails: {
    id: "",
    capacityAvailable: [],
    colorsAvailable: [],
    color: "",
    capacity: "",
    namespaceId: "",
    images: [],
    description: [
      {
        title: "",
        text: [],
      },
    ],
    resolution: "",
    processor: "",
    camera: "",
    zoom: "",
    cell: [],
  },
  loaded: false,
  hasError: { erroreMessage: "", isError: false },
};

export const init = createAsyncThunk(
  "details/fetch",
  async ({ category, productId }: { category: string; productId: string }) => {
    const productsDetails = await getProductsDetails(category);

    if (productsDetails) {
      const details = productsDetails.find(
        (details) => details.id === productId
      );

      return details;
    }
  }
);

const detailsPageSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      if (action.payload) {
        state.productDetails = action.payload;
        state.loaded = true;
      }
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError.isError = true;
      state.hasError.erroreMessage = "Error fetching details";
    });
  },
});

export const { clear } = detailsPageSlice.actions;
export default detailsPageSlice.reducer;
