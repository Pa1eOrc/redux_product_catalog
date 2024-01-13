import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homePageSlice from '../features/HomePage/homePageSlice';
import phonesPageSlice from '../features/PhonesPage/phonesPageSlice';
import tabletsPageSlice from '../features/TabletsPage/tabletsPageSlice';
import accessoriesPageSlice from '../features/AccessoriesPage/accessoriesPageSlice';
import detailsPageSlice from '../features/DetailsPage/detailsPageSlice';
import selectedProductSlice from '../features/SelectedProduct/selectedProductSlice';
import favouritesPageSlice from '../features/FavouritesPage/favouritesPageSlice';
import cartsPageSlider from '../features/CartsPage/cartsPageSlice';
import searchParamsSlice from '../features/SearchParams/searchParamsSlice';

export const store = configureStore({
  reducer: {
    homePage: homePageSlice,
    phonesPage: phonesPageSlice,
    tabletsPage: tabletsPageSlice,
    accessoriesPage: accessoriesPageSlice,
    detailsPage: detailsPageSlice,
    selectedProduct: selectedProductSlice,
    favouriteProducts: favouritesPageSlice,
    cartsPage: cartsPageSlider,
    searhParams: searchParamsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
