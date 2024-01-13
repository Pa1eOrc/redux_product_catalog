import { Option } from "../../type/Dropdown";
import { Product } from "../../type/Product";
import { filterProductsById } from "./sortHelperFunctions";

export function getArrayLength(array: Product[], perPage: number) {
  return array.length - perPage;
}

export function isProductAdded(productsToCheck: Product[], id: string) {
  return productsToCheck.some((product) => product.id === id);
}

export function getArrayUpdates(
  productsToUpdare: Product[],
  productToCheck: Product
) {
  const productIsAdded = isProductAdded(productsToUpdare, productToCheck.id);
  let updatedProducts = [];

  if (productIsAdded) {
    updatedProducts = filterProductsById(productsToUpdare, productToCheck.id);
  } else {
    updatedProducts = [...productsToUpdare, productToCheck];
  }

  return updatedProducts;
}

export function setPerPage(length: number, perPage: string) {
  return perPage === "all" ? length : +perPage;
}

export function setPageCount(length: number, perPageToNum: number) {
  return Array.from(
    { length: Math.ceil(length / perPageToNum) },
    (_, index) => index + 1
  );
}

export function setStartIndex(perPageToNum: number, page: number) {
  return (page - 1) * perPageToNum;
}

export function setCurrentOption(
  options: Option,
  currentValue: string
): string {
  const foundKey = Object.keys(options).find(
    (key) => options[key] === currentValue
  );

  return foundKey || "";
}
