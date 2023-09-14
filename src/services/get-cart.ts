import axios from "axios";

import getValidAccessToken from "@helpers/check-token";
import { ICart } from "@interfaces/cart";
import { ITokenResponse } from "@interfaces/token-response";

interface ICartResponse {
  data: {
    results: ICart[];
  };
}

const getCart = async () => {
  let cart: ICart;

  const tokenObject: ITokenResponse = await getValidAccessToken();

  const accessToken = tokenObject?.access_token;
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response: ICartResponse = await axios.get(
      `${apiHost}/${projectKey}/me/carts`,
      {
        headers,
      }
    );

    if (response.data.results.length) {
      [cart] = response.data.results;
    } else {
      cart = {} as ICart;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error getting cart:", error);
    throw error;
  }

  return cart;
};

export default getCart;
