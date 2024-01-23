import classNames from "classnames";
import "./Button.scss";
import { Product } from "../../type/Product";
import { isProductAdded } from "../../helpers/utils/functions";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import * as favouritesPageActions from "../../features/FavouritesPage/favouritesPageSlice";
import * as cartsPageActions from '../../features/CartsPage/cartsPageSlice';

type Props = {
  name: string;
  product: Product;
};

export const Button: React.FC<Props> = ({ name, product }) => {
  const dispatch = useAppDispatch();
    const { favourites } = useAppSelector((state) => state.favouriteProducts);
    const { carts } = useAppSelector(state => state.cartsPage);

  const isProductInCart = isProductAdded(carts, product.itemId);
  const isProductInFavourites = isProductAdded(favourites, product.itemId);

  const handleButtonClick = (e: React.MouseEvent, action: string) => {
    e.preventDefault();

    if (action === "cart") {
      dispatch(cartsPageActions.togle({product}))
    }

    if (action === "favourites") {
      dispatch(favouritesPageActions.togle({product}))
    }
  };

  return (
    <div className="button">
      <button
        type="submit"
        className={classNames(
          "button__add",
          { "button__add--selected": isProductInCart },
          { "button__add--details": name === "details" }
        )}
        onClick={(e) => handleButtonClick(e, "cart")}
      >
        {isProductInCart ? "Added to cart" : "Add to cart"}
      </button>

      <button
        type="submit"
        title="favourites"
        data-cy="addToFavorite"
        className={classNames("button__fav", {
          "button__fav--details": name === "details",
        })}
        onClick={(e) => handleButtonClick(e, "favourites")}
      >
        <span
          className={classNames("icon", "icon--favourites", {
            "icon--favourites-red": isProductInFavourites,
          })}
        />
      </button>
    </div>
  );
};
