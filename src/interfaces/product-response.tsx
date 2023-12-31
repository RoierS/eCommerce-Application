interface IMasterData {
  current: IProductData;
}

export interface IImage {
  url: string;
}

export interface IAttributes {
  filter(arg0: (attribute: IAttributes) => boolean): IAttributes[];
  name: string;
  value: number;
}

export interface IPrice {
  value: {
    centAmount: number;
  };
  discounted: {
    value: {
      centAmount: number;
    };
  };
}

export interface IVariant {
  images: IImage[];
  prices: IPrice[];
  attributes: IAttributes;
  id: number;
}
enum Locale {
  EnUS = "en-US",
}

export interface ITranslation {
  [Locale.EnUS]: string;
}

interface IProductData {
  name: ITranslation;

  description: ITranslation;

  masterVariant: IVariant;
}

export interface IProductResponse {
  id: string;
  version: number;
  key: string;
  masterData: IMasterData;
}
