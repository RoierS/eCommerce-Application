export interface IProductSearchResult {
  id: string;
  name: {
    "en-US": string;
  };
  description: {
    "en-US": string;
  };
  categories: {
    typeId: string;
    id: string;
  }[];
  masterVariant: {
    attributes: {
      name: string;
      value: string;
    }[];
    images: {
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
    prices: {
      id: string;
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
      discounted?: {
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
      };
    }[];
    key: string;
    sku: string;
    id: number;
  };
}
