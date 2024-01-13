import { useState } from "react";
import { Carousel } from "../Carousel";
import { ProductSlider } from "../ProductSlider";
import { getArrayLength } from "../../helpers/utils/functions";
import { Product } from "../../type/Product";

type Props = {
  newBrandProducts: Product[];
};

export const BrandNew: React.FC<Props> = ({ newBrandProducts }) => {
  const itemsPerPage = 4;
  const [currentBrandNewSlide, setCurrentBrandNewSlide] = useState(0);
  const length = getArrayLength(newBrandProducts, itemsPerPage);

  return (
    <section className="home-page__brand-new">
      <div className="container">
        <h1 className="text text--h2">Brand new models</h1>

        <ProductSlider
          currentSlide={currentBrandNewSlide}
          setCurrentSlide={setCurrentBrandNewSlide}
          length={length}
        />
      </div>

      <Carousel
        products={newBrandProducts}
        currentSlide={currentBrandNewSlide}
        id="brand-new"
      />
    </section>
  );
};
