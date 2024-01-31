import { Product } from "../../type/Product";

export function imgFormatFunction ( product: Product) {
    if (
      product.itemId.includes("iphone-12") ||
      product.itemId.includes("iphone-13") ||
      product.itemId.includes("iphone-14")
    ) {
      return "img/phones/apple-iphone-7/black/00.jpg";
    }

    if (product.category === "phones") {
      return product.image.replace(/\.webp$/, ".jpg");
    }

    return product.image;
  };