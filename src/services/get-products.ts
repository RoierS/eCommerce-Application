/* eslint-disable no-console */
import axios from "axios";

import { ITokenResponse } from "@interfaces/token-response";

import { getAccessToken } from "./authentication-service";

const getProducts = async () => {
  const tokenObject: ITokenResponse = await getAccessToken();

  const accessToken = tokenObject?.access_token || "";
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(`${apiHost}/${projectKey}/products`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getProducts;
