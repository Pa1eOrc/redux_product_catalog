import { useEffect } from "react";
import { Loader } from "../../components/Loader";
import { Dropdown } from "../../components/Dropdown";
import { Pagination } from "../../components/Pagination";
import { ProductList } from "../../components/ProductList";
import { NoResults } from "../../components/NoResults";
import { SortProducts } from "../../helpers/utils/sortProducts";
import { NoSearchResults } from "../../components/NoSearchResults";
import { BreadCrumbs } from "../../components/BreadCrumbs";
import * as phonesPageActions from "../../features/PhonesPage/phonesPageSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DropdownIterface } from "../../type/Dropdown";
import {
  setPageCount,
  setPerPage,
  setStartIndex,
} from "../../helpers/utils/functions";

import "../../styles/block/page.scss";

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { phones, loaded, hasError } = useAppSelector(
    (state) => state.phonesPage
  );
  const { sort, perPage, page, query } = useAppSelector(state => state.searhParams);

  const sortDropdown: DropdownIterface = {
    name: "sort",
    options: {
      Newest: "age",
      Alphabetically: "name",
      Cheapest: "price",
    },
    isOpen: false,
  };

  const perPageDropdown: DropdownIterface = {
    name: "perPage",
    options: {
      4: "4",
      8: "8",
      16: "16",
      All: "all",
    },
    isOpen: false,
  };

  const sortedPhones = SortProducts(phones, sort, query);
  const totalLength = sortedPhones.length;
  const perPageToNum = setPerPage(totalLength, perPage);
  const pageCount = setPageCount(totalLength, perPageToNum);
  const startIndex = setStartIndex(perPageToNum, page);
  const productsForCurrentPage = sortedPhones.slice(
    startIndex,
    startIndex + perPageToNum
  );    

  useEffect(() => {
    dispatch(phonesPageActions.init());
  }, [dispatch]);

  const renderContext = () => {
    if (loaded && phones.length === 0) {
      return <NoResults category="Phones" />;
    }

    if (loaded && hasError.isError) {
      return <h1>{hasError.erroreMessage}</h1>;
    }

    if (query && sortedPhones.length === 0) {
      return <NoSearchResults category="phones" />;
    }

    return <ProductList productsForCurrentPage={productsForCurrentPage} />;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="page">
      <BreadCrumbs linkName="Phones" />

      <h1 className="text text--h1 page__title">Mobile phones</h1>

      <p className="text text--gray">{`${phones.length} models`}</p>

      <div className="page__dropdown-container">
        <Dropdown
          key={sortDropdown.name}
          dropdown={sortDropdown}
          currentValue={sort}
          queryKey={sortDropdown.name}
          name="Sort by"
        />
        <Dropdown
          key={perPageDropdown.name}
          dropdown={perPageDropdown}
          currentValue={perPage.toString()}
          queryKey={perPageDropdown.name}
          name="Items on page"
        />
      </div>

      {!loaded ? (
        <Loader />
      ) : (
        <div className="page__main-container">
          {renderContext()}

          {pageCount.length > 1 && (
            <Pagination
              currentPage={page}
              pageCount={pageCount}
              totalLength={totalLength}
            />
          )}
        </div>
      )}
    </section>
  );
};
