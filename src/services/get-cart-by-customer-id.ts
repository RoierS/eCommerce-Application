import axios from "axios";

import getValidAccessToken from "@helpers/check-token";
import { ICartResponse } from "@interfaces/get-cart";
import { ITokenResponse } from "@interfaces/token-response";
import createCart from "@services/create-cart";

const getCartByCustomerId = async (): Promise<ICartResponse> => {
  const tokenObject: ITokenResponse = await getValidAccessToken();

  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;
  const dataUser = localStorage.getItem("user");
  let clientId = null;
  if (dataUser) {
    const userData = JSON.parse(dataUser);
    clientId = userData.id;
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenObject.access_token}`,
  };

  try {
    const response = await axios.get<ICartResponse>(
      `${apiHost}/${projectKey}/carts/customer-id=${clientId}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return await createCart();
  }
};
export default getCartByCustomerId;
