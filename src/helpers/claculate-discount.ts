import { IProductData } from "@interfaces/product-data";

const calculateDiscount = (product: IProductData): number => {
  const originalPrice =
    product.masterData.current.masterVariant.prices[0].value.centAmount;
  const discountPrice =
    product.masterData.current.masterVariant.prices[0].discounted?.value
      .centAmount;

  if (discountPrice) {
    const discountAmount = originalPrice - discountPrice;
    return Math.round((discountAmount / originalPrice) * 100);
  }

  return 0;
};

export default calculateDiscount;
