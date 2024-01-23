import classNames from "classnames";

import { Link, useParams, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { ProductSlider } from "../../components/ProductSlider";
import { Carousel } from "../../components/Carousel";
import { About } from "../../components/About";
import { Button } from "../../components/Button";
import { Option } from "../../components/Options";
import { BackButton } from "../../components/BackButton";
import { getArrayLength } from "../../helpers/utils/functions";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import * as detailsPageActions from "../../features/DetailsPage/detailsPageSlice";
import * as selectedProductActions from "../../features/SelectedProduct/selectedProductSlice";

import "./DetailsPage.scss";
import { filterProductsById } from "../../helpers/utils/sortHelperFunctions";

export const DetailsPage = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.homePage);
  const { product } = useAppSelector((state) => state.selectedProduct);
  const { productDetails, loaded } = useAppSelector(
    (state) => state.detailsPage
  );

  const { price, fullPrice, screen, image, ram, name, category, itemId } =
    product;

  const suggestedProducts = filterProductsById(products, itemId);  

  useEffect(() => {
    if (productId && products) {
      dispatch(selectedProductActions.take({ products, productId }));
    }
  }, [products, productId, dispatch]);

  useEffect(() => {
    if (productId && category) {
      dispatch(detailsPageActions.init({ category, productId }));
    }
  }, [category, productId, dispatch]);

  const {
    capacityAvailable,
    colorsAvailable,
    images,
    description,
    resolution,
    processor,
    camera,
    zoom,
    cell,
    color,
    capacity,
  } = productDetails;

  const imgFormat = useCallback(() => {
    if (
      itemId.includes("iphone-12") ||
      itemId.includes("iphone-13") ||
      itemId.includes("iphone-14")
    ) {
      return "img/phones/apple-iphone-7/black/00.jpg";
    }

    if (category === "phones") {
      return image.replace(/\.webp$/, ".jpg");
    }

    return image;
  }, [itemId, category, image]);

  const imagesFormat = () => {
    if (
      itemId.includes("iphone-12") ||
      itemId.includes("iphone-13") ||
      itemId.includes("iphone-14")
    ) {
      return ["img/phones/apple-iphone-7/black/00.jpg"];
    }

    if (category === "phones") {
      return images.map((img) => img.replace(/\.webp$/, ".jpg"));
    }

    return images;
  };

  const itemsPerPage = 4;
  const [selectedImg, setSelectedImg] = useState(imgFormat);
  const getBackButtonName = location.pathname.split("/")[1];
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = getArrayLength(suggestedProducts, itemsPerPage);
  const [isCapacity, setIsCapacity] = useState(capacity);
  const [isColor, setIsColor] = useState(color);

  useEffect(() => {
    setSelectedImg(imgFormat);
    setIsCapacity(capacity);
    setIsColor(color);
  }, [image, capacity, color, imgFormat]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const handleImageClick = (e: React.MouseEvent, img: string) => {
    e.preventDefault();
    setSelectedImg(img);
  };

  const renderContext = () => {
    if (!productDetails) {
      return (
        <div>
          <BackButton />
          <h2>Product was not found</h2>
        </div>
      );
    }

    return (
      <>
        <div className="details__bread-crumbs" data-cy="breadCrumbs">
          <Link to="/">
            <span className="icon icon--home" />
          </Link>

          <span className="icon icon--arrow-dis icon--next" />

          <Link
            to={{
              pathname: "..",
              search: state?.search,
            }}
            className="text text--small details__bread-crumbs-text"
          >
            {getBackButtonName}
          </Link>

          <span className="icon icon--arrow-dis icon--next" />

          <p
            className="
            text text--small text--gray details__bread-crumbs-text"
          >
            {name.toLowerCase()}
          </p>
        </div>

        <BackButton />

        <h1 className="details__title text text--h2">{name.toLowerCase()}</h1>

        <section className="details__main-container">
          <div className="details__selected-img-container details__selected-img-container--mobile">
            <img
              src={`${selectedImg}`}
              alt="img"
              className="details__img details__img--selected"
            />
          </div>

          <ul className="details__images-container">
            {imagesFormat().map((img) => (
              <li
                key={img}
                className={classNames("details__image-container", {
                  "details__image-container--selected": selectedImg === img,
                })}
              >
                <a
                  href="/"
                  type="button"
                  onClick={(e) => handleImageClick(e, img)}
                >
                  <img className="details__img" src={`${img}`} alt="img" />
                </a>
              </li>
            ))}
          </ul>

          <div className="details__selected-img-container details__selected-img-container--tablets">
            <img
              src={`${selectedImg}`}
              alt="img"
              className="details__img details__img--selected"
            />
          </div>

          <div className="details__inner-container">
            <Option
              capacityAvailable={capacityAvailable}
              colorsAvailable={colorsAvailable}
              isCapacity={isCapacity}
              setIsCapacity={setIsCapacity}
              isColor={isColor}
              setIsColor={setIsColor}
            />

            <div className="details__info-container">
              <div className="details__price-container">
                <p className="text text--h2">{`$${price}`}</p>

                <p
                  className={classNames(
                    "text",
                    "text--h2",
                    "text--h2-strikethrough",
                    "text--gray"
                  )}
                >
                  {`$${fullPrice}`}
                </p>
              </div>

              <Button name="details" product={product} />

              <ul className="details__info-container">
                <li className="details__info">
                  <p className="text text--gray text--small">Screen</p>
                  <p className="text text--small">{screen}</p>
                </li>
                <li className="details__info">
                  <p className="text text--gray text--small">Resolution</p>
                  <p className="text text--small">{resolution}</p>
                </li>
                <li className="details__info">
                  <p className="text text--gray text--small">Processor</p>
                  <p className="text text--small">{processor}</p>
                </li>
                <li className="details__info">
                  <p className="text text--gray text--small">RAM</p>
                  <p className="text text--small">{ram}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <About
          description={description}
          screen={screen}
          resolution={resolution}
          processor={processor}
          ram={ram}
          capacity={capacity}
          camera={camera}
          zoom={zoom}
          cell={cell}
        />

        <div className="details__carousel-container">
          <div className="details__carousel-top">
            <h2 className="text text--h2">You may also like</h2>
            <ProductSlider
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              length={length}
            />
          </div>

          <Carousel
            products={suggestedProducts}
            currentSlide={currentSlide}
            id="random"
          />
        </div>
      </>
    );
  };

  return (
    <section className="details">
      {!loaded ? <Loader /> : renderContext()}
    </section>
  );
};
