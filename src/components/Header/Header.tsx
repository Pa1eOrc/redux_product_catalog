import cn from "classnames";
import debounce from "debounce";

import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getSearchWith } from "../../helpers/utils/getSearchWith";
import { SearchParams } from "../../type/SearchParams";
import { useAppSelector } from "../../app/hooks";

import "./Header.scss";

export const Header = () => {
  const { product } = useAppSelector((state) => state.selectedProduct);
  const { carts } = useAppSelector((state) => state.cartsPage);
  const { favourites } = useAppSelector((state) => state.favouriteProducts);
  const { query } = useAppSelector((state) => state.searhParams);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const links = ["phones", "tablets", "accessories", "favourites"];
  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  const isProductDetailsPage = links.some(
    (link) => location.pathname === `/${link}/${product.itemId}`
  );
  const getPlaceholderText = location.pathname.split("/")[1];

  const [isMenu, setIsMenu] = useState(false);
  const [inputValue, setInputValue] = useState(query);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn("navbar__link", { "navbar__link--active": isActive });

  const setDebounceSearchWidth = useCallback(
    debounce((paramsToUpdate: SearchParams) => {
      const search = getSearchWith(searchParams, paramsToUpdate);

      setSearchParams(search);
    }, 500),
    [searchParams, getSearchWith]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedInput = { query: e.target.value || null };

    setInputValue(e.target.value);
    setDebounceSearchWidth(updatedInput);
  };

  const clearInput = () => {
    setSearchParams(getSearchWith(searchParams, { query: null }));
    setInputValue("");
  };

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  return (
    <header className="header">
      <div className="header__main-container">
        <div className="header__logo-container">
          <NavLink to="/" className="header__logo icon icon--logo" />
        </div>

        <button
          type="button"
          title="menu button"
          className="header__menu-button"
          onClick={() => setIsMenu(!isMenu)}
        >
          <span className="icon icon--menu" />
        </button>
      </div>

      <nav className={cn("navbar", { "navbar--active": isMenu })}>
        <div className="navbar__first-list">
          <NavLink
            to="/"
            className={getLinkClass}
            onClick={() => setIsMenu(false)}
          >
            <p className="navbar__item navbar__item--link">Home</p>
          </NavLink>

          <NavLink
            to="/phones"
            className={getLinkClass}
            onClick={() => setIsMenu(false)}
          >
            <p className="navbar__item navbar__item--link">Phones</p>
          </NavLink>

          <NavLink
            to="/tablets"
            className={getLinkClass}
            onClick={() => setIsMenu(false)}
          >
            <p className="navbar__item navbar__item--link">Tablets</p>
          </NavLink>

          <NavLink
            to="/accessories"
            className={getLinkClass}
            onClick={() => setIsMenu(false)}
          >
            <p className="navbar__item navbar__item--link">Accessories</p>
          </NavLink>
        </div>

        <div className="navbar__second-list">
          {!isHomePage && !isCartPage && !isProductDetailsPage && (
            <label className="navbar__search-container">
              <input
                type="search"
                placeholder={`Search in ${getPlaceholderText}...`}
                className="navbar__search"
                value={inputValue}
                onChange={handleInputChange}
              />

              {!inputValue ? (
                <span className="icon icon--search" />
              ) : (
                <button
                  onClick={clearInput}
                  type="submit"
                  title="clear imput"
                  className="navbar__clear-button"
                  data-cy="searchDelete"
                >
                  <span className="icon icon--cross" />
                </button>
              )}
            </label>
          )}

          <NavLink
            to="/favourites"
            className={getLinkClass}
            onClick={() => setIsMenu(false)}
          >
            <div className="navbar__item navbar__item--icon">
              <span className="icon icon--favourites" />
              {favourites.length > 0 && (
                <span className="navbar__quantity">{favourites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={getLinkClass}
            onClick={() => setIsMenu(false)}
          >
            <div className="navbar__item navbar__item--icon">
              <span className="icon icon--cart" />
              {carts.length > 0 && (
                <span className="navbar__quantity">{carts.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
