import { useState } from "react";
import { Carousel } from "../Carousel";
import { ProductSlider } from "../ProductSlider";
import { Product } from "../../type/Product";
import { getArrayLength } from "../../helpers/utils/functions";

type Props = {
  hotPriceProducts: Product[];
};

export const HotPrices: React.FC<Props> = ({ hotPriceProducts }) => {
  const itemsPerPage = 4;
  const [currentHotPriceSlide, setCurrentHotPriceSlide] = useState(0);
  const length = getArrayLength(hotPriceProducts, itemsPerPage);

  return (
    <section className="home-page__hot-price">
      <div className="container">
        <h1 className="text text--h2">Hot prices</h1>

        <ProductSlider
          currentSlide={currentHotPriceSlide}
          setCurrentSlide={setCurrentHotPriceSlide}
          length={length}
        />
      </div>

      <Carousel
        products={hotPriceProducts}
        currentSlide={currentHotPriceSlide}
        id="hot-price"
      />
    </section>
  );
};
