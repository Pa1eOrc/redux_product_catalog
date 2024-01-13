import { Product } from '../../type/Product';

export function SortProducts(products: Product[], sort: string, query: string) {
  let sortedProducts: Product[] = [];

  switch (sort) {
    case 'age':
      sortedProducts = [...products].sort(
        (productA, productB) => productA.year - productB.year,
      );
      break;

    case 'name':
      sortedProducts = [...products].sort(
        (productA, productB) => productA.name.localeCompare(productB.name),
      );
      break;

    case 'price':
      sortedProducts = [...products].sort(
        (productA, productB) => {
          return productA.price - productB.price;
        },
      );
      break;

    default:
      sortedProducts = products;
  }

  if (query) {
    const queryArray = query.split(' ');

    queryArray.forEach(queryValue => {
      sortedProducts = sortedProducts.filter(
        product => product.name.toLowerCase(
        ).includes(queryValue.toLowerCase()),
      );
    });
  }

  return sortedProducts;
}
