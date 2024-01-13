import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";

import * as homePageActions from "./features/HomePage/homePageSlice";
import * as favouritesPageActions from "./features/FavouritesPage/favouritesPageSlice";
import * as cartsPageActions from "./features/CartsPage/cartsPageSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(homePageActions.init());
    dispatch(favouritesPageActions.init())
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
