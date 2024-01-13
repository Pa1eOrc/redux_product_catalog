import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type/Product";

type SelectedProductState = {
  product: Product;
};

const initialState: SelectedProductState = {
  product: {
    fullPrice: 0,
    price: 0,
    year: 0,
    id: "",
    itemId: "",
    capacity: "",
    name: "",
    image: "",
    category: "",
    screen: "",
    ram: "",
  },
};

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    clear: () => initialState,

    take: (
      state: SelectedProductState,
      action: PayloadAction<{ products: Product[]; productId: string }>
    ) => {
      const { products, productId } = action.payload;

      const selectedProduct = products.find((p) => p.itemId === productId);

      if (selectedProduct) {
        state.product = selectedProduct;
      }
    },
  },
});

export const { take, clear } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
