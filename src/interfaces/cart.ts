export interface ILineItem {
  productId: string;
  productKey: string;
  variant: {
    prices: [
      {
        value: {
          currencyCode: string;
          centAmount: number;
        };
        discounted: {
          value: {
            currencyCode: string;
            centAmount: number;
          };
        };
      }
    ];
    images: { url: string }[];
  };
  quantity: number;
  totalPrice: {
    centAmount: number;
  };
}

export interface ICart {
  id: string;
  version: number;
  lineItems: ILineItem[];
  totalPrice: {
    currencyCode: string;
    centAmount: number;
  };
}
