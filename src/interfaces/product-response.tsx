interface IMasterData {
  current: IProductData;
}

interface IImage {
  url: string;
}
interface IPrice {
  value: {
    centAmount: number;
  };
}

interface IVariant {
  images: IImage[];
  prices: IPrice[];
}

interface ILocale {
  "en-US": string;
}

interface IProductData {
  name: ILocale;

  description: ILocale;

  masterVariant: IVariant;
}

export interface IProductResponse {
  id: string;
  version: number;
  key: string;
  masterData: IMasterData;
}
