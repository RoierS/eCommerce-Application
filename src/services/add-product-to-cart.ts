import axios from "axios";

import getValidAccessToken from "@helpers/check-token";
import { ICartResponse } from "@interfaces/get-cart";
import { IProductResponse } from "@interfaces/product-response";
import { ITokenResponse } from "@interfaces/token-response";

const addProductToCart = async (
  product: IProductResponse,
  cart: ICartResponse
): Promise<IProductResponse> => {
  const tokenObject: ITokenResponse = await getValidAccessToken();

  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenObject.access_token}`,
  };
  const requestBody = {
    version: cart.version,
    actions: [
      {
        action: "addLineItem",
        productId: product.id,
        variantId: product.masterData.current.masterVariant.id,
        quantity: 1,
      },
    ],
  };
  const cartData = localStorage.getItem("cart");
  let cartId = null;
  if (cartData) {
    const userData = JSON.parse(cartData);
    cartId = userData.id;
  }
  try {
    const response = await axios.post<IProductResponse>(
      `${apiHost}/${projectKey}/carts/${cartId}`,
      requestBody,
      { headers }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error while creating cart:", error);
    throw error;
  }
};
export default addProductToCart;
