import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as homePageActions from '../../features/HomePage/homePageSlice';
import "./HomePage.scss";
import { Banner } from "../../components/Banner";
import { Category } from "../../components/Category";
import { BrandNew } from "../../components/BrandNew";
import { HotPrices } from "../../components/HotPrices";

import "./HomePage.scss";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    hotPriceProducts,
    brandNewProducts,
    // loaded,
    // hasError,
  } = useAppSelector(state => state.homePage);
    const links = ["phones", "tablets", "accessories"];

  useEffect(() => {
    dispatch(homePageActions.init());
  }, [dispatch]);

  return (
    <main className="home-page">
      <h1 className="home-page__title text text--h1">
        Welcome to Nice Gadgets store!
      </h1>

      <Banner links={links} />

      <BrandNew newBrandProducts={brandNewProducts} />

      <Category links={links} products={products} />

      <HotPrices hotPriceProducts={hotPriceProducts} />
    </main>
  );
}
