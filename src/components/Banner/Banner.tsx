// import classNames from "classnames";

import { Link } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";

import "./Banner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

type Props = {
  links: string[];
};

export const Banner: React.FC<Props> = ({ links }) => {
  // const [activeSlide, setActiveSlide] = useState(0);
  // const totalSlides = links.length;

  // const handleButtonClick = useCallback(
  //   (action: "next" | "prev") => {
  //     if (action === "next") {
  //       setActiveSlide((prevSlide) =>
  //         prevSlide < totalSlides - 1 ? prevSlide + 1 : 0
  //       );
  //     } else if (action === "prev") {
  //       setActiveSlide((prevSlide) =>
  //         prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
  //       );
  //     }
  //   },
  //   [totalSlides]
  // );

  // const autoChangeSlide = useCallback(() => {
  //   handleButtonClick("next");
  // }, [handleButtonClick]);

  // useEffect(() => {
  //   const intervalId = setInterval(autoChangeSlide, 5000);

  //   return () => clearInterval(intervalId);
  // }, [activeSlide, autoChangeSlide]);

  return (
    <section className="home-page__banner banner">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="my-swiper"
      >
        {links.map((link, index) => (
          <SwiperSlide key={link}>
            <Link to={`/${link}`} className="banner__link">
              <img
                className="banner__img"
                src={`img/banner-${link}.png`}
                alt={`${link} banner`}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="banner__carousel-container">
        <button
          type="button"
          className="banner__arrow"
          title="arrow"
          onClick={() => handleButtonClick("prev")}
        >
          <span className="icon icon--arrow icon--prev" />
        </button>

        <ul className="banner__carousel">
          {links.map((link, index) => (
            <li key={link}>
              <Link
                to={`/${link}`}
                className={`banner__link
              ${index === activeSlide ? "banner__link--active" : ""}
              ${index === activeSlide + 1 ? "banner__link--next" : ""}
              ${index === activeSlide - 1 ? "banner__link--prev" : ""}
              ${
                activeSlide === 0 && index === totalSlides - 1
                  ? "banner__link--prev"
                  : ""
              }
              ${
                activeSlide === totalSlides - 1 && index === 0
                  ? "banner__link--next"
                  : ""
              }
              `}
              >
                <img
                  className="banner__img"
                  src={`img/banner-${link}.png`}
                  alt={`${link} banner`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="banner__arrow"
          title="arrow"
          onClick={() => handleButtonClick("next")}
        >
          <span className="icon icon--arrow icon--next" />
        </button>
      </div>

      <div className="banner__dot-container">
        <span
          className={classNames("banner__dot", {
            "banner__dot--active": activeSlide === 0,
          })}
        />
        <span
          className={classNames("banner__dot", {
            "banner__dot--active": activeSlide === 1,
          })}
        />
        <span
          className={classNames("banner__dot", {
            "banner__dot--active": activeSlide === 2,
          })}
        />
      </div> */}
    </section>
  );
};
