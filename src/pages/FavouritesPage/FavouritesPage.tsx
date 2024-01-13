import { ProductList } from "../../components/ProductList";
import { SortProducts } from "../../helpers/utils/sortProducts";
import { NoSearchResults } from "../../components/NoSearchResults";
import { BreadCrumbs } from "../../components/BreadCrumbs";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

import "../../styles/block/page.scss";

export const FavouritesPage = () => {
  const { favourites } = useAppSelector((state) => state.favouriteProducts);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const sortedFavourites = SortProducts(favourites, "", query);
  const { length } = favourites;  

  const renderContext = () => {
    if (length === 0) {
      return "You dont have any favourites";
    }

    if (query && sortedFavourites.length === 0) {
      return <NoSearchResults category="favourites" />;
    }

    return <ProductList productsForCurrentPage={sortedFavourites} />;
  };

  return (
    <section className="page">
      <BreadCrumbs linkName="Favourites" />

      <h1 className="text text--h1 page__title">Favourites</h1>

      {length > 0 && (
        <p className="text text--gray">
          {length === 1 ? "1 item" : `${length} items`}
        </p>
      )}

      <div className="page__main-container page__main-container--fav">
        {renderContext()}
      </div>
    </section>
  );
};
