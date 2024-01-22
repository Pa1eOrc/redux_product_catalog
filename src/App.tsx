import { Outlet, useSearchParams } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";

import * as homePageActions from "./features/HomePage/homePageSlice";
import * as favouritesPageActions from "./features/FavouritesPage/favouritesPageSlice";
import * as cartsPageActions from "./features/CartsPage/cartsPageSlice";
import * as searchParamsActions from "./features/SearchParams/searchParamsSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get("page") || 1);
  const sort = searchParams.get("sort") || "age";
  const perPage = searchParams.get("perPage") || "16";
  const query = searchParams.get("query") || "";

  useEffect(() => {
    dispatch(searchParamsActions.setPage({page}));
    dispatch(searchParamsActions.setSort({sort}));
    dispatch(searchParamsActions.setPerPage({perPage}));
    dispatch(searchParamsActions.setQuery({query}));
  }, [dispatch, page, sort, perPage, query]);

  useEffect(() => {
    dispatch(homePageActions.init());
    dispatch(favouritesPageActions.init());
    dispatch(cartsPageActions.init());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default App;
